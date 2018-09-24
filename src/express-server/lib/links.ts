import _ = require('lodash');
import async = require('async');

interface Link {
  linkId: string;
  url: string;
}

interface LinkDb {
  [linkId: string]: Link
}

interface LinkIdResult {
  (error?: Error, linkId?: string): void;
}

interface LinkResult {
  (error?: Error, link?: Link): void;
}

// TODO: Add real database
const memoryDb: LinkDb = {}

const link = {
  generateLink: generateLink,
  generateId: generateId,
  generateUniqueId: generateUniqueId,
  getLink: getLink,
  putLink: putLink
};

export default link;

// Create random id from approved chars
// TODO put some of this stuff in the config
function generateId({
  idLength = 6,
  chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
} = {}) {
  return _.take(_.shuffle(chars), idLength).join('');
}

// Create a random id that hasn't been used before
function generateUniqueId(
  options: {
    linkId?: string,
    maxTries?: number,
  } | null,
  callback: LinkIdResult,
) {
  let {
    maxTries = 3,
    linkId = null,
  } = (options || {})

  let tries = 0;
  async.doUntil<string | null, Error | null>(
    (cb) => {
      tries++;
      linkId = linkId || link.generateId();
      link.getLink({ linkId: linkId }, (err, record) => {
        if (err) {
          return cb(err);
        }

        if (record) {
          return cb();
        }

        // If link already exists, ignore this id
        cb(null, linkId);
      });
    },
    () => {
      // Stop if we find an unused linkId or we exceed maximum tries
      return !!linkId || tries > maxTries;
    },
    (err) => {
      if (err) {
        return callback(err);
      }
      // TODO increase id length by 1 for each failure and this basically won't happen
      if (!linkId) {
        return callback(new Error('Could not find unique id'));
      }
      callback(undefined, linkId);
    }
  );
}

// Create new link for given url
function generateLink(
  { url }: { url: string },
  callback: LinkResult,
) {
  async.auto({
    'id': (cb: LinkIdResult) => {
      link.generateUniqueId(null, cb);
    },
    'create': ['id', (results: { id: string }, cb: LinkResult) => {
      const record = {
        linkId: results.id,
        url,
      }
      link.putLink(record, cb);
    }]
  }, 10, (err?: Error, results?) => {
    if (err) {
      return callback(err);
    }

    if (!results) {
      return callback();
    }

    callback(undefined, results.create);
  });
}

// Retrieve link information for given id
function getLink({
  linkId,
}: {
  linkId: string,
}, callback: LinkResult) {

  // TODO: Handle missing link
  const record = memoryDb[linkId];
  callback(undefined, record);
}

// Save record to database (use generateLink in route)
function putLink(record: Link, callback: LinkResult) {
  memoryDb[record.linkId] = record;
  callback(undefined, record);
}
