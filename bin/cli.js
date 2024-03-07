#!/usr/bin/env node

import { program } from "commander";

import { setupProject } from "../src/index.js";

program
	.version("1.0.0")
	.description("Configure ESLint for Astro projects")
	.option("-p, --path <path>", "Specify the project path. Defaults to ./", "./")
	.action((options) => {
		setupProject(options);
	});

program.parse();
