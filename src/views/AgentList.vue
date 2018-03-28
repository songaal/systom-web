<template lang="html">
  <div class="wrapper">
    <b-card>
      <b-tabs>
        <b-tab title="나의 알고리즘" active>
          <div solt="header">
            <b-button variant="primary" to="Agent">생성</b-button>
          </div>
          <table class="table table-md">
            <thead>
              <tr>
                <th>알고리즘 이름</th>
                <th>알고리즘 아이디</th>
                <th>버전</th>
                <th>수익률</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">테스트 알고리즘</th>
                <td>AAA-1234-bbbb-5555</td>
                <td>1.0.1</td>
                <td>+1%</td>
                <td>
                  <b-button variant="info" to="Agent">수정</b-button>
                </td>
              </tr>
              <tr>
                <th scope="row">평균이동 알고리즘</th>
                <td>BBB-1234-bbbb-5555</td>
                <td>3.2.1</td>
                <td>+23%</td>
                <td>
                  <b-button variant="info" to="Agent">수정</b-button>
                </td>
              </tr>
              <tr>
                <th scope="row">개발중</th>
                <td>AAA-1234-bbbb-33335</td>
                <td>0.2.1</td>
                <td>-55%</td>
                <td>
                  <b-button variant="info" to="Agent">수정</b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </b-tab>
        <b-tab title="구매한 알고리즘" >
          <div solt="header">
            <b-button variant="primary">마켓</b-button>
          </div>
          <table class="table table-md">
            <thead>
              <tr>
                <th>알고리즘 이름</th>
                <th>알고리즘 아이디</th>
                <th>버전</th>
                <th>판매자아이디</th>
                <th>수익률</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">테스트 알고리즘</th>
                <td>AAA-1234-bbbb-5555</td>
                <td>1.0.1</td>
                <td>testuser@test.com</td>
                <td>+1%</td>
                <td>
                  <b-button variant="info" to="Agent">보기</b-button>
                  <b-button variant="info" to="">시작</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
