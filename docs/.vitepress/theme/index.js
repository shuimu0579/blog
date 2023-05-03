import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import "/blog/common.css";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
};
