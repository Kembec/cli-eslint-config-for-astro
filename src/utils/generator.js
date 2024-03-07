import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function installDependencies({ devDependencies }, projectPath, packageManager) {
	const absolutePath = path.resolve(projectPath);

	if (!fs.existsSync(absolutePath)) {
		fs.mkdirSync(absolutePath, { recursive: true });
	}

	const packageJsonPath = path.join(absolutePath, "package.json");
	if (!fs.existsSync(packageJsonPath)) {
		fs.writeFileSync(packageJsonPath, JSON.stringify({ name: "auto-generated", version: "1.0.0" }));
	}

	const command = {
		npm: `npm install --save-dev ${devDependencies.join(" ")}`,
		yarn: `yarn add --dev ${devDependencies.join(" ")}`,
		pnpm: `pnpm add --save-dev ${devDependencies.join(" ")} --ignore-workspace-root-check`,
	}[packageManager];

	execSync(command, { cwd: absolutePath, stdio: "inherit" });
}
