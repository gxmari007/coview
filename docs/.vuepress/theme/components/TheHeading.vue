<template>
  <co-row class="the-heading">
    <co-col :xs="24" :sm="24" :md="6" :lg="5" :xl="5" :xxl="4">
      <router-link class="the-heading__logo" to="/">
        <img src="../../assets/vue.svg" alt="logo" />
        <span>CoView</span>
      </router-link>
    </co-col>
    <co-col :xs="0" :sm="0" :md="18" :lg="19" :xl="19" :xxl="20">
      <co-menu
        class="the-heading__navs docs-menu"
        mode="horizontal"
        :selected-names="selectedNames">
        <co-menu-item
          v-for="(nav, index) in navs"
          :key="index"
          :name="nav.link">
          <router-link :to="nav.link">{{ nav.text }}</router-link>
        </co-menu-item>
      </co-menu>
    </co-col>
  </co-row>
</template>

<script>
export default {
  name: 'TheHeading',
  computed: {
    navs() {
      return this.$site.themeConfig.nav;
    },
    linkMap() {
      const map = {};

      this.navs.forEach((nav) => {
        const key = nav.link.split('/').slice(0, -1).join('/');

        map[key] = nav.link;
      });

      return map;
    },
    selectedNames() {
      const key = this.$route.path.split('/').slice(0, -1).join('/');

      return [this.linkMap[key]];
    },
  },
};
</script>

<style lang="less">
.the-heading {
  position: relative;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;

  &__logo {
    display: flex;
    align-items: center;
    float: left;
    height: 64px;
    padding-left: 40px;

    &:focus {
      text-decoration: none;
    }

    img {
      height: 32px;
      margin-right: 16px;
      vertical-align: middle;
    }

    span {
      font-family: 'Titillium Web', sans-serif;
      font-size: 18px;
      font-weight: 500;
      color: #0d1a26;
    }
  }

  &__navs.co-menu--horizontal {
    float: right;
    border-bottom: none;
    margin-right: 40px;
  }

  .co-menu__item {
    height: 64px;
    line-height: 64px;
  }
}
</style>
