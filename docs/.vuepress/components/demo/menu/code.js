export const horizontal = `
  <template>
    <co-menu :selected-names="[current]" mode="horizontal" @on-click="onClick">
      <co-menu-item name="mail">
        <co-icon type="mail" />Navigation One
      </co-menu-item>
      <co-menu-item name="app" disabled>
        <co-icon type="appstore" />Navigation Two
      </co-menu-item>
      <co-sub-menu name="sub">
        <template slot="title">
          <co-icon type="setting" />
          <span>Navigation Three - Submenu</span>
        </template>
        <co-item-group>
          <template slot="title">Item 1</template>
          <co-menu-item name="setting:1">Option 1</co-menu-item>
          <co-menu-item name="setting:2">Option 2</co-menu-item>
        </co-item-group>
        <co-item-group>
          <template slot="title">Item 2</template>
          <co-menu-item name="setting:3">Option 3</co-menu-item>
          <co-menu-item name="setting:4">Option 4</co-menu-item>
        </co-item-group>
      </co-sub-menu>
      <co-menu-item name="link">
        <co-button href="https://www.google.com" target="_blank">Navigation Four - Link</co-button>
      </co-menu-item>
    </co-menu>
  </template>

  <script>
  export default {
    data() {
      return {
        current: 'mail',
      };
    },
    methods: {
      onClick(e) {
        console.log('click', e);
        this.current = e.name;
      },
    },
  };
  </script>
`;