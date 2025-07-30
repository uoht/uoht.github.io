import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export const Comment = () => {
  const { colorMode } = useColorMode();

  return (
    <div style={{ paddingTop: 50 }}>
      <Giscus
        id="comments"
        repo="uoht/uoht.github.io"
        repoId="R_kgDOPQu0pw"
        category="Announcements"
        categoryId="DIC_kwDOPQu0p84CtTRt"
        mapping="og:title"
        strict="1"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode === 'dark' ? 'dark_dimmed' : 'light'}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
};

export default Comment;
