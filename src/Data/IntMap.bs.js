// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Data_Map$OptolithClient = require("./Data_Map.bs.js");

var compare = Caml_obj.caml_compare;

var IntMap = Data_Map$OptolithClient.Make({
      compare: compare
    });

var Foldable = IntMap.Foldable;

var Traversable = IntMap.Traversable;

var size = IntMap.size;

var member = IntMap.member;

var notMember = IntMap.notMember;

var lookup = IntMap.lookup;

var findWithDefault = IntMap.findWithDefault;

var empty = IntMap.empty;

var singleton = IntMap.singleton;

var insert = IntMap.insert;

var insertWith = IntMap.insertWith;

var insertWithKey = IntMap.insertWithKey;

var insertLookupWithKey = IntMap.insertLookupWithKey;

var $$delete = IntMap.$$delete;

var adjust = IntMap.adjust;

var adjustWithKey = IntMap.adjustWithKey;

var update = IntMap.update;

var updateWithKey = IntMap.updateWithKey;

var updateLookupWithKey = IntMap.updateLookupWithKey;

var alter = IntMap.alter;

var union = IntMap.union;

var map = IntMap.map;

var mapWithKey = IntMap.mapWithKey;

var foldrWithKey = IntMap.foldrWithKey;

var foldlWithKey = IntMap.foldlWithKey;

var elems = IntMap.elems;

var keys = IntMap.keys;

var assocs = IntMap.assocs;

var fromList = IntMap.fromList;

var filter = IntMap.filter;

var filterWithKey = IntMap.filterWithKey;

var mapMaybe = IntMap.mapMaybe;

var mapMaybeWithKey = IntMap.mapMaybeWithKey;

exports.Foldable = Foldable;
exports.Traversable = Traversable;
exports.size = size;
exports.member = member;
exports.notMember = notMember;
exports.lookup = lookup;
exports.findWithDefault = findWithDefault;
exports.empty = empty;
exports.singleton = singleton;
exports.insert = insert;
exports.insertWith = insertWith;
exports.insertWithKey = insertWithKey;
exports.insertLookupWithKey = insertLookupWithKey;
exports.$$delete = $$delete;
exports.adjust = adjust;
exports.adjustWithKey = adjustWithKey;
exports.update = update;
exports.updateWithKey = updateWithKey;
exports.updateLookupWithKey = updateLookupWithKey;
exports.alter = alter;
exports.union = union;
exports.map = map;
exports.mapWithKey = mapWithKey;
exports.foldrWithKey = foldrWithKey;
exports.foldlWithKey = foldlWithKey;
exports.elems = elems;
exports.keys = keys;
exports.assocs = assocs;
exports.fromList = fromList;
exports.filter = filter;
exports.filterWithKey = filterWithKey;
exports.mapMaybe = mapMaybe;
exports.mapMaybeWithKey = mapMaybeWithKey;
/* IntMap Not a pure module */
