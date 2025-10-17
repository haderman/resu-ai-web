import './style.css';
import '../src/themes/resume-theme.css';
import '../src/styles/utility.css';
import "../src/styles/globals.css";

export const parameters = {
  // Add your global parameters here
};

export const decorators = [
  function ProvideTheme(story) {
    return (
      <div className="theme-container" data-resume-theme="dark-space" id="root">
        {story()}
      </div>
    );
  },
];
