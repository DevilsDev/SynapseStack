/**
 * File: scripts/validate-pipeline.ts
 * Description: Validates pipeline.yaml against pipeline.schema.json using AJV.
 * Version: 0.1.2
 * Author: Ali Kahwaji
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const schemaPath = path.resolve(__dirname, '../schemas/pipeline.schema.json');
const configPath = path.resolve(__dirname, '../pipeline.yaml');

const schema = yaml.load(fs.readFileSync(schemaPath, 'utf8')) as object;
const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as object;

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema);
const valid = validate(config);

if (valid) {
  console.log(' pipeline.yaml is valid.');
  process.exit(0);
} else {
  console.error(' pipeline.yaml is invalid.');
  console.error(validate.errors);
  process.exit(1);
}
