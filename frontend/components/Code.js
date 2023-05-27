import React from 'react';
import Refractor from 'react-refractor';
import markdown from 'refractor/lang/markdown.js';
import jsx from 'refractor/lang/jsx.js';
import liquid from 'refractor/lang/liquid.js';
import css from 'refractor/lang/css.js';
import js from 'refractor/lang/javascript.js';
import sass from 'refractor/lang/sass.js';
import bash from 'refractor/lang/bash.js';

const languages = [jsx, markdown, liquid, js, css, sass, bash];

languages.forEach(language => {
    Refractor.registerLanguage(language);
});

export function Code({ language, code, highlightedLines }) {
    return (
        <Refractor
            language={language}
            value={code}
            markers={highlightedLines}
        />
    );
}