import { equals } from "../../../../Data/Eq";
import { List } from "../../../../Data/List";
import { fromDefault, Record } from "../../../../Data/Record";
import { pipe } from "../../../Utilities/pipe";
import { Sex } from "../../Hero/heroTypeHelpers";
import { AllRequirementObjects } from "../wikiTypeHelpers";
import { RequireActivatable } from "./ActivatableRequirement";

export interface SexRequirement {
  id: "SEX"
  value: Sex
}

export const SexRequirement =
  fromDefault<SexRequirement> ({
    id: "SEX",
    value: "m",
  })

export const isSexRequirement =
  pipe (RequireActivatable.A.id, equals<string | List<string>> ("SEX")) as unknown as
    (req: AllRequirementObjects) => req is Record<SexRequirement>
