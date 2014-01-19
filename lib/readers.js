var primitives = require('./primitives.js');
var readUInt8 = primitives.readUInt8;
var readUVInt = primitives.readUVInt;
var readUtf8 = primitives.readUtf8;


function readDictionaryBase () {
  return {
    group: 0,
    name: 'BASE'
  };
}

function readDefinitionName (fileStream) {
  // groupId is used in java as a stream Id. But I think this here actually refers to the parent.
  // groupId is used to lookup a name prefix, presumably from the parent
  // actually, groupId appears to be the parents stream id
  var groupId = readUVInt (fileStream);
  var name = readUtf8(fileStream);
  return {group : groupId, name: name}; // TODO add fullname when we have library lookup
}

function readDefinitionNameAndVersion (fileStream,library) {
  var name = readDefinitionName(fileStream,library);
  var version = readDefinitionVersion(fileStream,library);
  name.version = version;
  return name;
}

function readDefinitionVersion (fileStream) {
  var major = readUInt8(fileStream);
  var minor = readUInt8(fileStream);
  return {major : major, minor: minor};
}







module.exports.metaMappings = {
  'BASE': readDictionaryBase,
  'name': readDefinitionName,
  'definition':  readDefinitionNameAndVersion
};

module.exports.readDictionaryBase = readDictionaryBase;
module.exports.readDefinitionName = readDefinitionName;
module.exports.readDefinitionNameAndVersion = readDefinitionNameAndVersion;