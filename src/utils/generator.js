import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function installDependencies({ dependencies, devDependencies }, projectPath, packageManager) {
	const absolutePath = path.resolve(projectPath);

	if (!fs.existsSync(absolutePath)) {
		fs.mkdirSync(absolutePath, { recursive: true });
	}

	const packageJsonPath = path.join(absolutePath, "package.json");
	if (!fs.existsSync(packageJsonPath)) {
		fs.writeFileSync(packageJsonPath, JSON.stringify({ name: "auto-generated", version: "1.0.0" }));
	}

	if (dependencies.length > 0) {
		console.log(dependencies);
		execInstallDependencies(dependencies, packageManager, absolutePath);
	}
	if (devDependencies.length > 0) {
		execInstallDependencies(devDependencies, packageManager, absolutePath, true);
	}
}

function execInstallDependencies(dependencies, packageManager, absolutePath, dev = false) {
	const command = {
		npm: `npm install ${dependencies.join(" ")} ${dev ? "--save-dev" : ""}`,
		yarn: `yarn add ${dependencies.join(" ")} ${dev ? "--dev" : ""}`,
		pnpm: `pnpm add ${dependencies.join(" ")} ${dev ? "--save-dev" : ""} --ignore-workspace-root-check`,
	}[packageManager];

	execSync(command, { cwd: absolutePath, stdio: "inherit" });
}
