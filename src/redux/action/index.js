/**
 * action类型
 */
export const SWITCH_MENU = 'SWITCH_MENU';

// 菜单点击切换，修改面包屑名称
export function switchMenu(menuName) {
    return {
        type:SWITCH_MENU,
        payload:{
            menuName
        }
    }
}