const path = require("path");
import { writeFileSync } from "fs";
import RSS from "rss";
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
    socialLinks: [
      { icon: "github", link: "https://github.com/shuimu0579" },
      { icon: "twitter", link: "https://twitter.com/shuimu19" },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"></path></svg>',
        },
        link: "mailto:shuimu0579@gmail.com",
        ariaLabel: "email",
      },
      {
        icon: {
          svg: '<svg data-v-a2773d72="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" color="orange"><g clip-path="url(#clip0_110_2)"><path d="M24 12C24 18.6281 18.6281 24 12 24C5.37188 24 0 18.6281 0 12C0 5.37188 5.37188 0 12 0C18.6281 0 24 5.37188 24 12Z" fill="#F26522"></path><path d="M7.57501 17.5266C6.67033 17.5266 5.93907 16.7953 5.93907 15.8906C5.93907 14.9859 6.67033 14.2547 7.57501 14.2547C8.4797 14.2547 9.21095 14.9859 9.21095 15.8906C9.21095 16.7906 8.4797 17.5266 7.57501 17.5266ZM11.4844 17.5266C11.4516 14.4797 8.98126 12.0094 5.93439 11.9766V9.55311C10.3266 9.58593 13.875 13.1391 13.9078 17.5266H11.4844ZM15.5906 17.5266C15.5813 14.9484 14.5734 12.5203 12.75 10.6969C10.9266 8.87343 8.50782 7.86561 5.93439 7.85624V5.4328C12.6 5.45624 18 10.8609 18.0141 17.5266H15.5906Z" fill="white"></path></g><defs><clipPath id="clip0_110_2"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>',
        },
        link: "/blog/feed.xml",
        ariaLabel: "RSS",
      },
    ],
    sidebar: [
      {
        text: "趁手的工具",
        collapsed: false,
        items: [
          {
            text: "常用工具汇总",
            link: "/guide/常用工具汇总",
          },
          {
            text: "微信读书App很好，但Reader让人惊艳",
            link: "/tools/readwise-reader",
          },
          {
            text: "思考工具Hepta",
            link: "/tools/heptabase",
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
            link: "/guide/how-to-learn",
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
    const feed = new RSS({
      title: "suimu blog",
      description: "suimu blog",
      site_url: hostname,
      feed_url: `${hostname}/blog/feed.xml`,
      language: "zh-CN",
      image_url: `${hostname}/blog/avatar.jpeg`,
      favicon: `${hostname}/blog/favicon.ico`,
    });
    // You might need to adjust this if your Markdown files
    // are located in a subfolder
    const data = await createContentLoader("*/*.md", {
      excerpt: true,
      render: true,
    }).load();

    console.log("data", data);
    data.sort(
      (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    );
    for (const { url, frontmatter, html } of data) {
      feed.item({
        title: frontmatter.title,
        id: `${hostname}/blog/${url}`,
        link: `${hostname}/blog/${url}`,
        description: frontmatter.description,
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
    writeFileSync(path.join(config.outDir, "feed.xml"), feed.xml());
  },
});
