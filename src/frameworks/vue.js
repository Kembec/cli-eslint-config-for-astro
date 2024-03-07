export function setupVue(eslintConfig, dependencies) {
	eslintConfig.extends.push("plugin:vue/vue3-essential");
	eslintConfig.plugins.push("vue");
	eslintConfig.overrides.push({
		files: ["*.vue"],
		parser: "vue-eslint-parser",
		parserOptions: {
			parser: "@typescript-eslint/parser",
			sourceType: "module",
		},
	});

	dependencies.devDependencies.push("eslint-plugin-vue", "@astrojs/vue", "vue");
}
