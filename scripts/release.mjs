import { spawn } from "node:child_process";
import { resolve } from "node:path";

/**
 *
 * @param {string} command
 * @param  {...Array<string>} args
 *
 * @returns {Promise<string>}
 */
const run = async (command, ...args) => {
  const cwd = resolve();
  return new Promise((resolve) => {
    const cmd = spawn(command, args, {
      stdio: ["inherit", "pipe", "pipe"], // Inherit stdin, pipe stdout, pipe stderr
      shell: true,
      cwd,
    });

    let output = "";

    cmd.stdout.on("data", (data) => {
      process.stdout.write(data.toString());
      output += data.toString();
    });

    cmd.stderr.on("data", (data) => {
      process.stderr.write(data.toString());
    });

    cmd.on("close", () => {
      resolve(output);
    });
  });
};

function parseArgs(argv) {
  const params = {};

  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const [key, value] = argv[i].includes("=")
        ? argv[i].slice(2).split("=")
        : [
            argv[i].slice(2),
            argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true,
          ];
      params[key] = value;
    } else if (argv[i].includes("=")) {
      const [key, value] = argv[i].split("=");
      params[key] = value;
    }
  }

  return { ...process.env, ...params };
}

const main = async () => {
  const args = process.argv.slice(2);
  const params = parseArgs(args);

  await run("pnpm changeset version");
  await run("git add .");
  await run('git commit -m "chore: update version"');
  await run("git push");
  await run("pnpm --filter desquidex build");
  await run("pnpm config set registry https://registry.npmjs.org/");
  if (params.OTP) {
    await run(`pnpm changeset publish --otp=${params.OTP}`);
  } else {
    await run("pnpm changeset publish");
  }
  await run("pnpm config set registry https://registry.npmmirror.com");
  await run("git push --follow-tags");
  const tag = (await run("git describe --abbrev=0")).replace("\n", "");
  await run(
    `gh release create ${tag} --title ${tag} --notes "Please refer to [CHANGELOG.md](https://github.com/sgalcheung/starlight-squidex/blob/main/packages/desquidex/CHANGELOG.md) for details."`
  );
};

main();
