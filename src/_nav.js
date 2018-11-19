export default {
  items: [
    {
      name: '투자하기',
      url: '/InvestGoods',
      icon: 'icon-cloud-download',
      guest: true
    },
    {
      name: '나의투자보기',
      url: '/investment',
      icon: 'icon-speedometer',
      guest: false
    },
    {
      name: '계정설정',
      url: '/account',
      icon: 'icon-user',
      guest: false
    },
    {
      name: '과금관리',
      url: '/invoice',
      icon: 'cui-dollar',
      guest: false
    },
    {
      name: '로그아웃',
      url: '/logout',
      icon: 'cui-account-logout',
      guest: false
    },
    {
      name: '로그인',
      url: '/login',
      icon: 'cui-user',
      guestOnly: true
    }
  ]
}
