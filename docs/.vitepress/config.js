const path = require("path");
import { writeFileSync } from "fs";
import { Feed } from "feed";
import { defineConfig, createContentLoader } from "vitepress";

const hostname = "https://suimulearn.cn";

export default defineConfig({
  lang: "zh-CN",
  title: "suimu blog",
  description: "suimu blog",
  lastUpdated: true,
  cleanUrls: true,
  base: "/blog/",
  themeConfig: {
    logo: "/avatar.jpeg",
    sidebar: [
      {
        text: "趁手的工具",
        collapsed: false,
        items: [
          {
            text: "微信读书App很好，但Reader让人惊艳",
            link: "/tools/readwise-reader",
          },
          {
            text: "常用工具汇总",
            link: "/guide/常用工具汇总",
          },
          {
            text: "1Password 注册使用教程",
            link: "/guide/1Password 注册使用教程",
          },
          {
            text: "Chrome浏览器以及其暗黑模式的使用",
            link: "/guide/Chrome浏览器以及其暗黑模式的使用",
          },
          {
            text: "GitHub使用教程",
            link: "/guide/GitHub使用教程",
          },
          {
            text: "Gmail邮箱的注册与使用",
            link: "/guide/Gmail邮箱的注册与使用",
          },
          {
            text: "OneDrive跨平台云存储",
            link: "/guide/OneDrive跨平台云存储",
          },

          {
            text: "个人笔记工具Obsidian",
            link: "/guide/个人笔记工具Obsidian",
          },
          {
            text: "如何用Netflix观看《鱿鱼游戏》",
            link: "/guide/如何用Netflix观看《鱿鱼游戏》",
          },
          {
            text: "微信读书和zlibrary的双剑合璧",
            link: "/guide/微信读书和zlibrary的双剑合璧",
          },
          {
            text: "思考工具Hepta",
            link: "/guide/思考工具Hepta",
          },
          {
            text: "找到想要的电子书",
            link: "/guide/找到想要的电子书",
          },
          {
            text: "搭建个人Z-library电子书机器人",
            link: "/guide/搭建个人Z-library电子书机器人",
          },
          {
            text: "这个工具，我用了三年",
            link: "/guide/这个工具，我用了三年",
          },
        ],
      },
      {
        text: "闲言碎语",
        collapsed: false,
        items: [
          {
            text: "心理偏差--查理芒格",
            link: "/guide/心理偏差--查理芒格",
          },
          {
            text: "孙子兵法全篇及思想精要",
            link: "/guide/孙子兵法全篇及思想精要",
          },
          {
            text: "毛选中的经典语录",
            link: "/guide/毛选中的经典语录",
          },
          {
            text: "怎么学习一个新的东西",
            link: "/guide/怎么学习一个新的东西",
          },
          {
            text: "科目三考了三次有感",
            link: "/guide/科目三考了三次有感",
          },
        ],
      },
    ],
  },
  buildEnd: async (config) => {
    const feed = new Feed({
      title: "suimu blog",
      description: "suimu blog",
      id: hostname,
      link: hostname,
      language: "zh-CN",
      image: "/avatar.jpeg",
      favicon: `${hostname}/favicon.ico`,
      copyright: "Copyright (c) 2023-present, suimu",
    });

    // You might need to adjust this if your Markdown files
    // are located in a subfolder
    const posts = await createContentLoader("*.md", {
      excerpt: true,
      render: true,
    }).load();

    posts.sort(
      (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    );

    for (const { url, excerpt, frontmatter, html } of posts) {
      feed.addItem({
        title: frontmatter.title,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        description: excerpt,
        content: html,
        author: [
          {
            name: "suimu",
            email: "shuimu0579@gmail.com",
            link: "https://twitter.com/shuimu19",
          },
        ],
        date: frontmatter.date,
      });
    }

    writeFileSync(path.join(config.outDir, "feed.rss"), feed.rss2());
  },
});
