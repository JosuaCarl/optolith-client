// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Int$OptolithClient = require("../../Data/Int.bs.js");
var Maybe$OptolithClient = require("../../Data/Maybe.bs.js");
var IntMap$OptolithClient = require("../../Data/IntMap.bs.js");
var IntSet$OptolithClient = require("../../Data/IntSet.bs.js");
var Yaml_Zip$OptolithClient = require("../Utilities/Yaml_Zip.bs.js");
var JsonStrict$OptolithClient = require("../Utilities/YAML/JsonStrict.bs.js");
var Static_Erratum$OptolithClient = require("./Static_Erratum.bs.js");
var Static_SourceRef$OptolithClient = require("./Static_SourceRef.bs.js");

function variantL10n(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          name: Json_decode.field("name", Json_decode.string, json),
          commonAdvantages: Json_decode.field("commonAdvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.string, param);
                }), json),
          commonDisadvantages: Json_decode.field("commonDisadvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.string, param);
                }), json),
          uncommonAdvantages: Json_decode.field("uncommonAdvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.string, param);
                }), json),
          uncommonDisadvantages: Json_decode.field("uncommonDisadvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.string, param);
                }), json)
        };
}

function tL10n(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          name: Json_decode.field("name", Json_decode.string, json),
          attributeAdjustments: Json_decode.field("attributeAdjustments", Json_decode.string, json),
          automaticAdvantages: JsonStrict$OptolithClient.optionalField("automaticAdvantages", Json_decode.string, json),
          stronglyRecommendedAdvantages: JsonStrict$OptolithClient.optionalField("stronglyRecommendedAdvantages", Json_decode.string, json),
          stronglyRecommendedDisadvantages: JsonStrict$OptolithClient.optionalField("stronglyRecommendedDisadvantages", Json_decode.string, json),
          commonAdvantages: JsonStrict$OptolithClient.optionalField("commonAdvantages", Json_decode.string, json),
          commonDisadvantages: JsonStrict$OptolithClient.optionalField("commonDisadvantages", Json_decode.string, json),
          uncommonAdvantages: JsonStrict$OptolithClient.optionalField("uncommonAdvantages", Json_decode.string, json),
          uncommonDisadvantages: JsonStrict$OptolithClient.optionalField("uncommonDisadvantages", Json_decode.string, json),
          variants: JsonStrict$OptolithClient.optionalField("variants", (function (param) {
                  return Json_decode.list(variantL10n, param);
                }), json),
          src: Json_decode.field("src", Static_SourceRef$OptolithClient.Decode.list, json),
          errata: Json_decode.field("errata", Static_Erratum$OptolithClient.Decode.list, json)
        };
}

function die(json) {
  return {
          amount: Json_decode.field("amount", Json_decode.$$int, json),
          sides: Json_decode.field("sides", Json_decode.$$int, json)
        };
}

function variantUniv(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          commonCultures: Json_decode.field("commonCultures", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          commonAdvantages: Json_decode.field("commonAdvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          commonDisadvantages: Json_decode.field("commonDisadvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          uncommonAdvantages: Json_decode.field("uncommonAdvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          uncommonDisadvantages: Json_decode.field("uncommonDisadvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          hairColors: Json_decode.field("hairColors", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          eyeColors: Json_decode.field("eyeColors", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          sizeBase: Json_decode.field("sizeBase", Json_decode.$$int, json),
          sizeRandom: Json_decode.field("sizeRandom", (function (param) {
                  return Json_decode.list(die, param);
                }), json)
        };
}

function withVariantsUniv(json) {
  return {
          variants: Json_decode.field("variants", (function (param) {
                  return Json_decode.list(variantUniv, param);
                }), json)
        };
}

function withoutVariantsUniv(json) {
  return {
          commonCultures: Json_decode.field("commonCultures", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          hairColors: Json_decode.field("hairColors", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          eyeColors: Json_decode.field("eyeColors", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          sizeBase: Json_decode.field("sizeBase", Json_decode.$$int, json),
          sizeRandom: Json_decode.field("sizeRandom", (function (param) {
                  return Json_decode.list(die, param);
                }), json)
        };
}

function partial_arg_000(json) {
  return /* WithVariants */Block.__(0, [withVariantsUniv(json)]);
}

var partial_arg_001 = /* :: */[
  (function (json) {
      return /* WithoutVariants */Block.__(1, [withoutVariantsUniv(json)]);
    }),
  /* [] */0
];

var partial_arg = /* :: */[
  partial_arg_000,
  partial_arg_001
];

function variantOptionsUniv(param) {
  return Json_decode.oneOf(partial_arg, param);
}

function tUniv(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          cost: Json_decode.field("cost", Json_decode.$$int, json),
          lp: Json_decode.field("lp", Json_decode.$$int, json),
          spi: Json_decode.field("spi", Json_decode.$$int, json),
          tou: Json_decode.field("tou", Json_decode.$$int, json),
          mov: Json_decode.field("mov", Json_decode.$$int, json),
          attributeAdjustments: Json_decode.field("attributeAdjustments", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list((function (param) {
                                              return Json_decode.pair(Json_decode.$$int, Json_decode.$$int, param);
                                            }), param);
                              }), param);
                }), json),
          attributeAdjustmentsSelectionValue: Json_decode.field("attributeAdjustmentsSelectionValue", Json_decode.$$int, json),
          attributeAdjustmentsSelectionList: Json_decode.field("attributeAdjustmentsSelectionList", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          automaticAdvantages: Json_decode.field("automaticAdvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          stronglyRecommendedAdvantages: Json_decode.field("stronglyRecommendedAdvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          stronglyRecommendedDisadvantages: Json_decode.field("stronglyRecommendedDisadvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          commonAdvantages: Json_decode.field("commonAdvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          commonDisadvantages: Json_decode.field("commonDisadvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          uncommonAdvantages: Json_decode.field("uncommonAdvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          uncommonDisadvantages: Json_decode.field("uncommonDisadvantages", (function (param) {
                  return JsonStrict$OptolithClient.maybe((function (param) {
                                return Json_decode.list(Json_decode.$$int, param);
                              }), param);
                }), json),
          weightBase: Json_decode.field("weightBase", Json_decode.$$int, json),
          weightRandom: Json_decode.field("weightRandom", (function (param) {
                  return Json_decode.list(die, param);
                }), json),
          variantOptions: Curry._1(variantOptionsUniv, json)
        };
}

function variant(univ, l10n) {
  return /* tuple */[
          univ.id,
          {
            id: univ.id,
            name: l10n.name,
            commonCultures: Curry._1(IntSet$OptolithClient.fromList, univ.commonCultures),
            commonAdvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.commonAdvantages),
            commonAdvantagesText: l10n.commonAdvantages,
            commonDisadvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.commonDisadvantages),
            commonDisadvantagesText: l10n.commonDisadvantages,
            uncommonAdvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.uncommonAdvantages),
            uncommonAdvantagesText: l10n.uncommonAdvantages,
            uncommonDisadvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.uncommonDisadvantages),
            uncommonDisadvantagesText: l10n.uncommonDisadvantages,
            hairColors: univ.hairColors,
            eyeColors: univ.eyeColors,
            sizeBase: univ.sizeBase,
            sizeRandom: univ.sizeRandom
          }
        ];
}

function t(univ, l10n) {
  var match = univ.variantOptions;
  var tmp;
  if (match.tag) {
    var withoutVariants = match[0];
    tmp = /* WithoutVariants */Block.__(1, [{
          commonCultures: Curry._1(IntSet$OptolithClient.fromList, withoutVariants.commonCultures),
          hairColors: withoutVariants.hairColors,
          eyeColors: withoutVariants.eyeColors,
          sizeBase: withoutVariants.sizeBase,
          sizeRandom: withoutVariants.sizeRandom
        }]);
  } else {
    tmp = /* WithVariants */Block.__(0, [{
          variants: Curry._1(IntMap$OptolithClient.fromList, Yaml_Zip$OptolithClient.zipBy(Int$OptolithClient.show, variant, (function (x) {
                      return x.id;
                    }), (function (x) {
                      return x.id;
                    }), match[0].variants, Maybe$OptolithClient.fromMaybe(/* [] */0, l10n.variants)))
        }]);
  }
  return {
          id: univ.id,
          name: l10n.name,
          cost: univ.cost,
          lp: univ.lp,
          spi: univ.spi,
          tou: univ.tou,
          mov: univ.mov,
          attributeAdjustments: Maybe$OptolithClient.maybe(IntMap$OptolithClient.empty, IntMap$OptolithClient.fromList, univ.attributeAdjustments),
          attributeAdjustmentsSelectionValue: univ.attributeAdjustmentsSelectionValue,
          attributeAdjustmentsSelectionList: Curry._1(IntSet$OptolithClient.fromList, univ.attributeAdjustmentsSelectionList),
          attributeAdjustmentsText: l10n.attributeAdjustments,
          automaticAdvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.automaticAdvantages),
          automaticAdvantagesText: l10n.automaticAdvantages,
          stronglyRecommendedAdvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.stronglyRecommendedAdvantages),
          stronglyRecommendedAdvantagesText: l10n.stronglyRecommendedAdvantages,
          stronglyRecommendedDisadvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.stronglyRecommendedDisadvantages),
          stronglyRecommendedDisadvantagesText: l10n.stronglyRecommendedDisadvantages,
          commonAdvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.commonAdvantages),
          commonAdvantagesText: l10n.commonAdvantages,
          commonDisadvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.commonDisadvantages),
          commonDisadvantagesText: l10n.commonDisadvantages,
          uncommonAdvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.uncommonAdvantages),
          uncommonAdvantagesText: l10n.uncommonDisadvantages,
          uncommonDisadvantages: Maybe$OptolithClient.fromMaybe(/* [] */0, univ.uncommonDisadvantages),
          uncommonDisadvantagesText: l10n.uncommonDisadvantages,
          weightBase: univ.weightBase,
          weightRandom: univ.weightRandom,
          variantOptions: tmp,
          src: l10n.src,
          errata: l10n.errata
        };
}

var Decode = {
  variantL10n: variantL10n,
  tL10n: tL10n,
  die: die,
  variantUniv: variantUniv,
  withVariantsUniv: withVariantsUniv,
  withoutVariantsUniv: withoutVariantsUniv,
  variantOptionsUniv: variantOptionsUniv,
  tUniv: tUniv,
  variant: variant,
  t: t
};

exports.Decode = Decode;
/* IntMap-OptolithClient Not a pure module */
