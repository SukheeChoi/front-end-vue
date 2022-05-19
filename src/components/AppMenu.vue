  <template>
  <ul class="nav flex-column">
    <li class="nav-item">
      <h6 class="text-white">Vue Home</h6>
      <router-link to="/" class="nav-link text-warning">Home</router-link>
      <router-link to="/about" class="nav-link text-warning">Abount</router-link>
    </li>

    <li class="nav-item">
      <h6 class="text-white">Menu01</h6>
      <router-link to="/menu01/exam01view" class="nav-link text-warning">Exam01View: 뷰 컴포넌트(싱글파일)</router-link>
      <router-link to="/menu01/exam02view" class="nav-link text-warning">Exam02View: 뷰 컴포넌트(폴더)</router-link>
      <router-link to="/menu01/exam03view" class="nav-link text-warning">Exam03View: UI 컴포넌트(공통 및 로컬)</router-link>
      <router-link to="/menu01/exam04view" class="nav-link text-warning">Exam04View: 뷰 이동</router-link>
      <router-link to="/menu01/exam05view" class="nav-link text-warning">Exam05View: 중첩된 라우트</router-link>
      <router-link to="/menu01/exam06view" class="nav-link text-warning">Exam06View: 지정된 위치에 배치</router-link>
      <router-link to="/menu01/exam07view" class="nav-link text-warning">Exam07View: URL 데이터 전달</router-link>
    </li>

    <li class="nav-item">
      <h6 class="text-white">Menu02</h6>
      <router-link to="/menu02/exam01binding" class="nav-link text-warning">Exam01Binding: 데이터 바인딩</router-link>
      <router-link to="/menu02/exam02refdata" class="nav-link text-warning">Exam02RefData: 반응형 데이터</router-link>
      <router-link to="/menu02/exam03reactivedata" class="nav-link text-warning">Exam03ReactiveData: 반응형 데이터</router-link>
      <router-link to="/menu02/exam04attrbinding" class="nav-link text-warning">Exam04AttrBinding: 속성 바인딩</router-link>
      <router-link to="/menu02/exam05formbinding" class="nav-link text-warning">Exam05FormBinding: 폼 바인딩</router-link>
    </li>
  </ul>
  </template>