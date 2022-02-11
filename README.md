# *‍💻** Front-End

### 📌프론트엔드

- npm install error
  ```jsx
  npm install --legacy-peer-deps
  ```

### 📌기능

- [ ] 메인페이지
- [x] 로그인/로그아웃
- [x] 회원가입
- [x] 회원정보 기능
  - [x] 회원정보 수정
  - [x] 회원정보 탈퇴
  - [x] 회원정보 비밀번호 변경
- [ ] 커뮤니티 페이지
- [x] 문의사항 페이지
- [x] 게시판 기능
  - [x] 게시글 리스트
  - [x] 게시글 작성
  - [x] 게시글 수정
  - [x] 게시글 삭제
  - [x] 게시글 상세보기
- [x] 댓글 기능
  - [x] 댓글 리스트
  - [x] 댓글 작성
  - [x] 댓글 수정
  - [x] 댓글 삭제
- [x] 관리자 페이지
  - [x] 회원 리스트
  - [x] 회원 탈퇴
  - [x] 회원 등급 변경
- [ ] 내 농장 페이지
  - [ ] 현재 농장 이미지
  - [ ] 이미지 첨부
  - [ ] 농장 정보
  - [x] 농장 온/습도 차트
  - [x] 농장 온/습도 기능
  - [x] 농장 설문 히스토리

### 📌 수정사항

- [ ] 메인페이지
  - [ ] 폰트 변경
  - [ ] 메인로고 경로 변경
  - [ ] 메인페이지 이미지, 설명 변경



- [ ] 댓글 기능
  - [ ] p 밑에 div 있으면 X



- [ ] 커뮤니티 기능
  - [ ] 같은 검색어로 2번째 검색하면 useEffect가 실행이 안되서 아무일도 일어나지 않음
  - [ ] community 구조 Notice 구조와 동일하게 변경
  - [ ] alert CSS
  - [ ] 쓸데없는 리렌더링 원인파악 및 수정



- [ ] 회원기능
  - [ ] 이메일 인증



---

- [ ] Never Used?!



- [ ] 로그인
  - [x] 유효성 검사 1글자씩 모자람 : 해결
  - [x] 클릭뿐만 아니라 엔터도 먹이게 해놈



- [ ] 회원가입
  - [ ] **`index.js:1 Warning: Each child in a list should have a unique "key" prop`** [??]
  - [x] 유효성 검사 1글자씩 모자람 : 해결
  - [x] 이름 & 별명 중복체크
    - [x] 한글만 되게 하고 싶은데... (숫자/영어 안됨)
    - [x] UseEffect 미친듯이 호출... (조건 중복 해결)
  - [x] 이메일 지워서 형식 다시 안맞으면 인증버튼 비활성화 : 해결
  - [x] 이메일 인증 막눌러도 가입 인증됨...



- [ ] 내 농장 + 관리자 페이지
  - [ ] **`Warning: The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?`** [괜찮다곤 하는데... Version차이?]



- [ ] MyFarm
  - [ ] FarmHistory
    - [ ] CSS
      - [x] 상태 : 상[초록], 중[주황], 하[빨강] 동그라미로



- [ ] 수정 필요?
  - [ ] Terms 글
  - [ ] Not Found CSS? (근데 본적이 없으 있나?)
  - [x] ContactUs (번호/메일 = 소원이)
  - [x] Footer (메일 = 윤택/혜성)



- [ ] 버그
  - [x] **`Board/MyFarmBoardList`** 
    - [x] 필요없는 props 제거
  - [ ] **`Auty/SignResponsiveDialog`**
    - [x] `justify`를 `justifycontent`로
    - [x] `<SignUpSection02>`에서 각 `TextField`들 id 중복되지 않게 숫자 부여 (별거아닌듯)
  - [ ] **`Search/SearchComponent`**
    - [x] `justify`를 `justifycontent`로
  - [ ] **`User/ChangePassword, DeleteAccount, MyInfo`**
    - [x] `justify`를 `justifycontent`로
  - [ ] **`layout/Drawer,Header`**
    - [x] `justify`를 `justifycontent`로
  - [ ] **`Community/Detail, Update, Write`**
    - [x] `justify`를 `justifycontent`로
  - [ ] **`Notice/Detail, Update, Write`**
    - [x] `justify`를 `justifycontent`로
  - [x] 문의사항 페이지
    - [x] 공지 and 문의 둘다
      - [x] 상세보기로 들어가면 헤더에 로고 안뜸
  - [x] **`User/MyInfo`**
    - [x] `rowsMax`를 `maxRows`로
    - [x] 버튼 내용 변경 (영어를 한글로)
  - [ ] **`User/VerticalTabs`**
    - [ ] **`Warning: Failed prop type: The prop `children` is not supported. Please remove it.`**
  - [ ] 



- [x] tree 구조
  - [x] 참고하여 쓸모없는 폴더 다 제거
  - [x] 관련하여 `header`와 `App.js`에서도 없어졌으니까 그것들 제거 [필요없는거]
