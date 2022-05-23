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
      <router-link to="/menu02/exam06listrendering" class="nav-link text-warning">Exam06ListRendering: 목록 렌더링</router-link>
      <router-link to="/menu02/exam07computedbinding" class="nav-link text-warning">Exam07ComputedBinding: 계산된 속성</router-link>
      <router-link to="/menu02/exam08slot" class="nav-link text-warning">Exam08Slot: 슬롯 템플릿 컴포넌트</router-link>
    </li>

    <li class="nav-item">
      <h6 class="text-white">Menu03</h6>
      <router-link to="/menu03/exam01eventhandling" class="nav-link text-warning">Exam01EventHandling: 이벤트 처리</router-link>
      <router-link to="/menu03/exam02watch" class="nav-link text-warning">Exam02Watch: 속성 감시</router-link>
    </li>

    <li class="nav-item">
      <h6 class="text-white">Menu04</h6>
      <router-link to="/menu04/exam01props" class="nav-link text-warning">Exam01Props: 부모에서 자식으로(prop 방식)</router-link>
      <router-link to="/menu04/exam02eventemit" class="nav-link text-warning">Exam02EventEmit: 자식에서 부모로(event 방식)</router-link>
      <router-link to="/menu04/exam03provideinject" class="nav-link text-warning">Exam03ProvideInject: Provide / Inject</router-link>
    </li>

    <li class="nav-item">
      <h6 class="text-white">Menu05</h6>
      <router-link to="/menu05/exam01lifecyclehooks" class="nav-link text-warning">Exam01LifeCycleHooks: LifeCycle Hooks</router-link>
      <router-link to="/menu05/exam02templaterefs" class="nav-link text-warning">Exam02TemplateRefs: 엘리먼트 태그 참조</router-link>
    </li>
  </ul>
  </template>