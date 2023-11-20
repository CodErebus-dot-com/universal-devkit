import sa from 'shell-artist';

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  blue: '#add7ff',
  cyan: '#89ddff',
  green: '#5de4c7',
  magenta: '#fae4fc',
  red: '#d0679d',
  yellow: '#fffac2',
};

export const renderTitle = async () => {
  const devKitAscii = sa.createAscii('Universal DevKit');
  const devKitGradient = sa.applyGradient(devKitAscii, Object.values(poimandresTheme));

  // resolves weird behavior where the ascii is offset
  // const pkgManager = getUserPkgManager();
  // if (pkgManager === "yarn" || pkgManager === "pnpm") {
  //   console.log("");
  // }
  // sa.log('Welcome to', { center: true });
  sa.log(devKitGradient, {
    box: {
      title: 'Welcome to',
      dimBorder: true,
      padding: 2,
      borderColor: 'cyan',
    },
  });
  sa.log('', { emoji: 'wave', center: true });
};
