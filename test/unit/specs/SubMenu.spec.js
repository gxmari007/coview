import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoSubMenu, CoMenuItem } = CoMenu;

describe('CoSubMenu', () => {
  const localVue = createLocalVue();

  localVue.component(CoSubMenu.name, CoSubMenu);
  localVue.component(CoMenuItem.name, CoMenuItem);

  it('default render', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);

    expect(subMenu.classes()).toContain('co-menu__submenu');
    expect(subMenu.classes()).toContain('co-menu__submenu--inline');
  });

  it('default slot', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
            <co-menu-item name="0">menu item</co-menu-item>
            <co-menu-item name="1">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const sub = wrapper.find('.co-menu__sub');
    const menuItems = wrapper.findAll(CoMenuItem);

    expect(sub.exists()).toBe(true);
    expect(sub.classes()).toContain('co-menu');
    expect(sub.classes()).toContain('co-menu--inline');
    expect(menuItems.length).toBe(2);
  });

  it('title slot', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenuTitle = wrapper.find('.co-menu__submenu-title');

    expect(subMenuTitle.exists()).toBe(true);
    expect(subMenuTitle.text()).toBe('sub menu title');
  });

  it('disabled prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: `
          <co-sub-menu name="sub0" disabled>
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);
    const subMenuTitle = subMenu.find('.co-menu__submenu-title');

    expect(subMenu.classes()).toContain('co-menu__submenu--disabled');
    // disabled 状态下 click hover 都没有效果
    expect(subMenu.vm.visible).toBe(false);

    subMenuTitle.trigger('click');

    expect(subMenu.vm.visible).toBe(false);
  });

  it('name prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);

    expect(subMenu.props().name).toBe('sub0');
  });

  it('inline 模式下通过 click 切换菜单的展开与收起', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
            <co-menu-item name="0">menu item</co-menu-item>
            <co-menu-item name="1">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);
    const subMenuTitle = subMenu.find('.co-menu__submenu-title');

    subMenuTitle.trigger('mouseenter');

    expect(subMenu.vm.visible).toBe(false);
    expect(subMenu.classes()).not.toContain('co-menu__submenu--open');

    subMenuTitle.trigger('click');

    expect(subMenu.vm.visible).toBe(true);
    expect(subMenu.classes()).toContain('co-menu__submenu--open');
  });

  // 测试工具渲染问题无法得到想要的 html 结构
  // it('CoSubMenu 中的 CoMenuItem 组件被选中状态下应该在 CoSubMenu 根标签上添加 co-menu__submenu--selected 类', () => {
  //   const wrapper = shallow(CoMenu, {
  //     propsData: { selectNames: ['0'] },
  //     slots: {
  //       default: `
  //         <co-sub-menu name="sub0">
  //           <template slot="title">sub menu title</template>
  //           <co-menu-item name="0">menu item</co-menu-item>
  //         </co-sub-menu>
  //       `,
  //     },
  //     localVue,
  //   });
  //   const submenu = wrapper.find(CoSubMenu);
  //   wrapper.update();

  //   expect(submenu.classes()).toContain('co-menu__submenu--selected');
  // });
});
