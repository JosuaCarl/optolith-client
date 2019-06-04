import { join } from "path";
import { tryIO } from "../../Control/Exception";
import { eitherToMaybe } from "../../Data/Either";
import { fmap } from "../../Data/Functor";
import { and, bindF } from "../../Data/Maybe";
import { parseJSON } from "../../Data/String/JSON";
import { readFile, writeFile } from "../../System/IO";
import { user_data_path } from "../Selectors/envSelectors";
import { pipe, pipe_ } from "./pipe";

const property_name = "update"

const file_path = join (user_data_path, "update.json")

/**
 * Check for the update file. If the `update` property in the JSON is set to
 * `True`, the IO returns `True`, otherwise `False`. Also returns `True` if
 * there is no file present.
 */
export const readUpdate =
  pipe_ (
    file_path,
    readFile,
    tryIO,
    fmap (pipe (eitherToMaybe, bindF (parseJSON), fmap (x => x[property_name] === true), and))
  )

/**
 * Pass in if an update has been downloaded or not, and then create/overwrite
 * an update file.
 */
export const writeUpdate =
  pipe (
    (x: boolean) => ({ [property_name]: x }),
    JSON.stringify,
    writeFile (file_path),
    tryIO
  )