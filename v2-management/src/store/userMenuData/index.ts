import i18n from '@/locales'

export interface userMenuDataState {
  menuData: Array<{
    id: string;
    title: string;
    path?: string;
  }>
}

export default {
  state: {
    menuData: [
      {
        id: '0',
        title: i18n.t('navbar.menu.home')
      },
      {
        id: '1',
        title: i18n.t('navbar.menu.customerManagement'),
        children: [
          {
            id: '11',
            title: i18n.t('navbar.menu.customerFiles')
          },
          {
            id: '12',
            title: i18n.t('navbar.menu.visitRecords')
          }
        ]
      },
      {
        id: '2',
        title: '3',
        children: [
          {
            id: '21',
            title: '4'
          },
          {
            id: '22',
            title: '5'
          }
        ]
      },
      {
        id: '3',
        title: '6',
        children: [
          {
            id: '31',
            title: '7'
          },
          {
            id: '32',
            title: '8'
          }
        ]
      }
    ]
  }
}
