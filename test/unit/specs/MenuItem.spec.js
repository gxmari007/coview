import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoSubMenu, CoMenuItem } = CoMenu;

describe('CoMenuItem 组件', () => {
  const localVue = createLocalVue();

  localVue.component(CoSubMenu.name, CoSubMenu);
  localVue.component(CoMenuItem.name, CoMenuItem);

  it('default render', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: '<co-menu-item name="0">menu item</co-menu-item>',
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(item.classes()).toContain('co-menu__item');
    expect(item.text()).toBe('menu item');
  });

  it('name prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: '<co-menu-item name="0">menu item</co-menu-item>',
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(item.props().name).toBe('0');
  });

  it('disabled prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0" disabled>menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(item.classes()).toContain('co-menu__item--disabled');
    item.trigger('click');
    expect(item.classes()).not.toContain('co-menu__item--selected');
  });

  it('点击组件可以为其添加 co-menu__item--selected 类', () => {
    const spyFn = jest.spyOn(CoMenu.methods, 'updateSelectItems');
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0">menu-item</co-menu-item>',
        ],
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    item.trigger('click');
    item.trigger('click');

    expect(item.classes()).toContain('co-menu__item--selected');
    expect(spyFn).toHaveBeenCalledTimes(2);

    spyFn.mockReset();
    spyFn.mockRestore();
  });

  it('在非 inline 模式下点击组件会清空 menu 组件中 openSubMenus 的值', () => {
    const wrapper = shallow(CoMenu, {
      propsData: {
        mode: 'inline',
        openNames: ['sub0'],
      },
      slots: {
        default: `
          <co-menu-item name="0">menu item</co-menu-item>
          <co-sub-menu name="sub0">
            <span slot="title">submenu title</span>
            <co-menu-item name="1">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(wrapper.vm.openSubMenus).toEqual(['sub0']);

    item.trigger('click');

    expect(wrapper.vm.openSubMenus).toEqual(['sub0']);

    wrapper.setProps({ mode: 'vertical' });
    item.trigger('click');

    expect(wrapper.vm.openSubMenus).toEqual([]);
  });
});
