import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import "/baseAlias/common.css";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
};
