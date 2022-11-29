import React, {useState} from 'react'
import {View, Text, ScrollView} from 'react-native'
import {NavigationProps, LangMap2} from '../type'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useGetStyle from '../hooks/use-style'

const PrivacyPolicy = ({navigation}: NavigationProps) => {
  const [globalText] = useState<LangMap2>({
    title1: {
      en: 'Welcome to TOEST!',
      ko: 'TOEST 이용자 여러분 반갑습니다!',
    },
    title2: {
      en: `1. The personal information items we collect are:`,
      ko: `1. 수집하는 개인정보 항목 및 수집방법`,
    },
    title3: {
      en: `2. The purpose of collecting and using personal information:`,
      ko: `2. 개인정보의 수집 및 이용 목적`,
    },
    title4: {
      en: `3. The provision of personal information to third parties:`,
      ko: `3. 제3자에게의 개인정보 제공`,
    },
    title5: {
      en: `4. The entrustment of processing personal information: `,
      ko: `4. 개인정보의 처리위탁`,
    },
    title6: {
      en: '5. The retention and utilization period of personal information:',
      ko: '5. 개인정보의 보유 및 이용기간',
    },
    title7: {
      en: '6. The destruction procedures and methods for personal information:',
      ko: '6. 개인정보의 파기 절차 및 파기방법',
    },
    title8: {
      en: '7. The rights of the user or legal representative:',
      ko: '7. 이용자 및 법정대리인의 권리와 그 행사방법',
    },
    title9: {
      en: '8. Installation of automated collecting of personal information and management:',
      ko: '8. 개인정보 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항',
    },
    title10: {
      en: '9. Technical and managerial measures for the protection of personal information:',
      ko: '9. 개인정보 보호를 위한 기술적∙관리적 조치',
    },
    title11: {
      en: '10. Department in charge of personal information management:',
      ko: '10. 개인정보 보호책임자 및 고객지원 담당부서 등 안내',
    },

    text1: {
      en: `Metavity Co., Ltd(hereby referred to as 'Company') is committed to protecting your rights and interests by complying with the privacy provisions of the related statutes
  that providers of information and communication services should comply with, including the Act on Promotion of Information and Communications Network Utilization and
  Information Protection, the Personal Information Protection Act, the Communications Secrets Protection Act, and the Telecommunication Business Act.`,
      ko: `(주)메타비티(이하 ‘회사’)는 이용자의 개인정보를 중요시하며, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「개인정보보호법」을 준수하기 위하여 노력하고 있습니다.
  회사는 이용자로부터 제공받은 개인정보를 어떠한 용도와 방식으로 이용하고 있으며, 개인정보보호를 위해 어떠한 조치를 취하고 있는지 개인정보처리방침을 통해 알려드립니다.
      `,
    },
    text2: {
      en: `The company collects personal information necessary for the first use of the service in order to sign up for membership (or service subscription), facilitate customer
  consultation, and provide various services. Collected information includes email address, username, password, and device information depending on the subscription
  method. If you subscribe to or link your account through SNS such as Facebook, Google, Kakao etc., your account's SNS ID, name, profile picture, gender, and email
  address are collected. In case of logout, we are requesting e-mail or Facebook, Google, and Kakao account information to avoid inconvenience when accessing the service
  again. When using a separate service within the service, more of your personal information could be collected after your approval." If you use individual services in
  the service, your personal information may be collected further after your consent. In addition, location information, access IP information, access (or authentication)
  log, AAID or IDFA, visitation date, service use record, sanction, and suspension record can be generated and collected during service use or business processing. The
  personal information described is collected in the course of the program's execution or use, or through a tool that collects, some information is collected in written
  forms, faxes, telephone calls, consultation boards, e-mail, and is also provided by other partners.`,
      ko: `회사는 회원가입(또는 서비스 가입), 원활한 고객상담, 각종 서비스의 제공을 위해 서비스 최초 이용 시 필요한 개인정보를 수집하고 있습니다. 회사가 수집하는 정보에는 가입 수단에 따라 이메일 주소, 별명, 비밀번호, 단말기 정보가 있습니다. 페이스북, 구글, 카카오 등의 SNS를 통해 가입 또는 계정 연동을 하는 경우에는 계정 SNS ID, 이름, 프로필사진, 성별, 이메일 주소 등이 수집됩니다. 로그아웃 시에는 서비스에 다시 접속할 때 불편함이 없도록 이메일 또는 페이스북·구글·카카오 계정정보를 필수적으로 요청하고 있습니다.
  서비스 내 개별 서비스 등을 이용하는 경우 여러분의 동의 후 개인정보가 추가로 수집될 수 있습니다. 그 밖에도 서비스 이용과정이나 사업처리 과정에서 위치정보, 접속 IP 정보, 접속(또는 인증)로그, AAID 혹은 IDFA, 방문 일시, 서비스 이용기록, 제재 및 이용정지 기록이 생성되어 수집될 수 있습니다.
  설명 드린 개인정보는 프로그램의 실행 또는 사용 과정에서 수집되거나 생성정보 수집 툴을 통해 이루어지며 일부 정보는 서면양식, 팩스, 전화, 상담 게시판, 이메일을 통해 수집되고, 기타 협력회사로부터 제공받기도 합니다.`,
    },
    text3: {
      en: `Personal information is used for smooth service delivery, membership management, development of new services and service announcements.
  Your personal information is used to identify each other within the service you have subscribed to and to provide parts and content that connect your account or invite your acquaintances through the means of connection you have set (Facebook, Google, and Kakao), and to provide specific customized services. In addition, it is also used for various member management, such as identification and prevention of unauthorized use, confirmation of subscription and duplicate registration, preservation of records for dispute settlement, handling complaints, and delivery of notices.
  In addition, users can use the various marketing and advertising campaigns, such as developing and customizing new services related to the entire service provided by the company, providing services based on statistical characteristics, validating services, providing opportunities to participate in events, providing advertising information, identifying frequency of access, and statistics on members' use of services.`,
      ko: `개인정보는 원활한 서비스 제공, 회원관리, 신규서비스 개발 및 서비스 안내 등을 위해 활용됩니다. 여러분의 개인정보는 가입하신 서비스 내 상호 식별, 여러분이 설정한 연결수단(페이스북·구글·카카오)으로 계정을 연결하거나 지인을 초대하는 부분 및 컨텐츠 제공, 특정 맞춤 서비스 제공에 활용됩니다. 그 밖에 회원제 서비스 이용에 따른 본인확인, 개인식별, 회사에서 제공하는 제반 서비스에서의 부정이용 및 비인가 사용방지, 가입의사 및 중복가입 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달과 같이 다양한 회원 관리를 위해서도 활용됩니다.
  이 외에도 회사에서 제공하는 전체 서비스와 관련한 신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 참여 기회 제공, 광고성 정보 제공, 접속빈도 파악, 회원의 서비스 이용에 대한 통계와 같은 다양한 마케팅•광고에 활용될 수 있습니다.`,
    },
    text4: {
      en: `Personal information is only used within the notice range and will not be disclosed to the public without your prior consent.
  The company uses your personal information only for the purpose of collecting and using personal information. For identification purposes, name and user name will be known amongst users while using the service.
  Personal information is not used or disclosed without your prior consent, except for the following cases: User name, e-mail address, etc. may be provided to third-party partners, with the user's consent, for the purpose of service operation and development or customer consultation. The personal information provided is kept/used until the end of the purpose
  In addition, personal information may be provided only if requested by other Korean statutes or by the investigation agency according to the procedures and methods specified in the statutes.`,
      ko: `개인정보는 고지 범위 내에서만 사용되며 여러분의 사전동의 없이 외부에 공개하지 않습니다.
  회사는 여러분의 개인정보를 개인정보의 수집 및 이용목적에 대해 고지한 범위 내에서만 사용합니다. 서비스 이용 중 사용자 식별을 위해 이름과 별명이 서비스 내 이용자 간에 공개됩니다. 위 목적 외에는 여러분의 사전동의 없이 개인정보를 이용 또는 공개하지 않으나 이하 내용의 경우에 대해서는 예외로 합니다. 서비스 운영과 개발이나 고객 상담의 목적으로 별명, 이메일 주소 등이 이용자의 동의를 받아 제3의 제휴사에 제공될 수 있습니다. 이렇게 제공된 개인정보는 목적 완료시점까지 보관/이용됩니다
  이 외에도 기타 대한민국 법령에 의거하거나 수사기관이 법령에서 정해진 절차와 방법에 따라 요청할 경우에 한 해 개인정보가 제공될 수 있습니다.
      `,
    },
    text5: {
      en: `The company entrusts the processing of personal information for each service to an external professional company as follows, only when necessary for the implementation of the service.
  Contents of consignment processing agency and consignment work for personal information
  Consignment processing agency: Limited 40, Yageun Monster
  Contents of consignment: Service development and operation`,
      ko: `회사는 서비스 이행을 위해 필요한 경우에 한해 아래와 같이 서비스 별로 개인정보 처리 업무를 외부 전문업체에 위탁하고 있습니다. 개인정보 위탁처리 기관 및 위탁업무 내용
  위탁처리 기관: 리미티드40, 야근몬스터
  위탁 업무 내용: 서비스 개발 및 운영
      `,
    },
    text6: {
      en: `When the purpose of collecting and using personal information is achieved, the data shall be destroyed without delay. 
  If due to regulations there is a need for the data to be retained, the personal information will be retained for a period of time set according to the related laws. In this case, the company will move the personal information in question to a separate database or separate retention area.      
      
  - Records on contracts or withdrawal of subscription: 5 years
  - Records on payments or providing of services: 5 years
  - Records on user's complaint or dispute handling: 3 years
  - Records on the collection, management, and usage of credit information: 3 years
  - Records on displays/advertisements: 6 months
  - Tracked data on user's internet log history and connection route: 3 months
  - Other data for confirmation of communications: 12 months`,
      ko: `회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 
  
  단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 개인정보를 보관합니다. 이 경우 회사는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
  - 계약 또는 청약철회 등에 관련 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률) 
  - 대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)
  - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)
  - 신용정보의 수집/처리 및 이용 등에 관한 기록: 3년 (신용정보의 이용 및 보호에 관한 법률)
  - 표시/광고에 관한 기록: 6개월 (전자상거래 등에서의 소비자보호에 관한 법률)
  - 이용자의 인터넷 등 로그기록/이용자의 접속지 추적자료: 3개월 (통신비밀보호법)
  - 그 외의 통신사실 확인자료: 12개월 (통신비밀보호법)
  `,
    },
    text7: {
      en: `When the purpose of collecting and using personal information is achieved, the data shall be destroyed without delay, and the destruction procedures and methods shall be as follows.
  (1) Destruction procedures
  Personal information that has been collected and used is transferred to a separate DB (separate filing box in case of paper) and destroyed after a certain period of storage according to internal policy and other reasons for information protection under relevant statutes (see retention and service period). The personal information shall not be used for purposes other than those provided by the law."
  (2) Destruction methods
  Personal information stored in electronic file format is deleted using technical methods such that the data cannot be recovered or reproduced. Personal information printed on paper destroyed through shredding or incineration."`,
      ko: `회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다. 
  
  (1) 파기절차 
  이용자의 개인정보는 목적이 달성된 후 별도의 DB (종이의 경우 별도의 서류함)로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(“7. 개인정보의 보유 및 이용기간” 참조) 일정 기간 보관된 후 파기됩니다. 별도 DB로 옮겨진 개인정보는 법령에 의한 경우가 아니고서는 보유되는 목적 이외의 다른 목적으로 이용되지 않습니다. 
  (2) 파기방법 
  전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제됩니다. 종이에 출력된 개인정보는 분쇄나 소각을 통하여 파기됩니다.`,
    },
    text8: {
      en: `You have the right to inquire about, revise or request to delete your personal information. You have the right to
  inquire about or revise your registered personal information at any time, and if you do not agree to the company's way of handling your personal information, you can
  refuse to consent or request to delete membership. However, if such is the case, some or all of the services may not be available. While using the service, if you would
  like to inquire about or revise your personal information, you can go to "profile settings". To delete your account, you can the inquire to customer center [
  support@metavity.world ] and withdraw from the service. You can also contact there person responsible for managing personal information via email and they will take care of the
  situation with delay. In addition, in the case of children under the age of 14 using a band, the legal representative has the right to inquire or modify the child's
  personal information, and the right to withdraw consent for the child. If you request correction of personal information errors, the personal information will not be
  used or provided until the correction is completed. Personal information that has been revoked or deleted upon your request will be disposed as specified for the
  maintenance and retention of personal information. We will dispose it so that it will not be used for any other purposes.`,
      ko: `여러분은 자신의 개인정보를 언제든 조회•수정할 수 있으며 삭제 요청이 가능합니다.
  등록되어 있는 여러분의 개인정보는 언제든지 조회하거나 수정하실 수 있으며, 회사의 개인정보 처리에 동의하지 않는 경우 동의를 거부하거나 가입해지(회원탈퇴)를 요청하실 수 있습니다. 다만, 그러한 경우 서비스의 일부 또는 전부 이용이 어려울 수 있습니다.
  이용 중 자신의 개인정보를 조회하거나 수정하기 위해서는 ‘프로필 설정’을, 가입해지(동의철회)를 위해서는 고객센터 [ support@metavity.world ]에 문의를 통하여 직접 열람하거나 정정 또는 탈퇴가 가능합니다. 혹은 개인정보관리책임자에게 서면 또는 이메일로 연락하시면 지체없이 조치하겠습니다. 또한, TOEST를 이용하는 만 14세 미만 아동의 경우, 법정대리인이 아동의 개인정보를 조회하거나 수정할 권리, 수집 및 이용 동의를 철회할 권리를 가집니다. 여러분이 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 회사는 여러분의 요청에 의해 해지 또는 삭제된 개인정보를 개인정보의 보유 및 이용기간에 대해 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.`,
    },
    text9: {
      en: `(Only if applicable under the relevant law)
  Cookies are sometimes used to provide web service. 
  Companies use 'cookies' to store and bring in your personal information to provide personalized and customized services. Cookies are stored on your device as a very small text file that the server used to run the website sends to your browser. 
      
  (1) Cookie usage
  Cookies are used in aiding the utilization of automatic logins, analysis of members' and non-members' visiting frequency, time period, etc., determining the users' area of interest, various events, optimized advertising, and customized information based on visit records and usage patterns."
      
  (2) Cookie settings
  The user has the right to choose in terms of cookie installation. As such, the user may allow all cookies by setting it as so on the web browser options, check every time cookies are saved, or deny the saving of all cookies. However, in the case of denying the cookies, there may be difficulties in providing the services.`,
      ko: `(정보통신망 이용촉진 및 정보보호 등에 관한 법률 적용대상인 경우에 한하여 적용됩니다)
  웹 서비스 제공을 위해 쿠키가 활용되기도 합니다.
  회사는 개인화되고 맞춤화된 서비스를 제공하기 위해서 여러분의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 여러분의 브라우저에게 보내는 아주 작은 텍스트 파일로 여러분의 디바이스에 저장됩니다. 
  (1) 쿠키 등 사용 목적 
  회사는 자동로그인 기능 구현, 회원과 비회원의 접속 빈도나 방문 시간 등 분석, 이용자의 취향과 관심분야 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 횟수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공의 목적으로 쿠키 등을 사용합니다. 
  
  (2) 쿠키 설정 방법 
  이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인하거나, 모든 쿠키의 저장을 거부할 수 있습니다. 
  단, 이용자가 쿠키 설치를 거부할 경우 서비스 제공에 어려움이 있을 수 있습니다. 
  
  – 쿠키 설정 방법 (인터넷 익스플로러 11.0을 사용하고 있는 경우)
  : 「도구」메뉴에서 「인터넷옵션」을 선택합니다. 
  「개인정보 탭」을 클릭합니다. 
  「고급」을 선택하여 본인에게 맞는 쿠키 허용 수준을 설정합니다. 
  
  – 받은 쿠키를 보는 방법 (익스플로러 11.0을 사용하고 있는 경우) 
  : 「도구」 메뉴에서 「인터넷옵션」을 선택합니다. 
  「일반」 탭을 클릭합니다.
  ‘검색기록’ 의 「설정」으로 들어가서 「파일보기」를 통해 확인합니다. 
  
  – 쿠키 설치 거부 방법 (인터넷 익스플로어 11.0을 사용하고 있는 경우)
  : 「도구」 메뉴에서 「인터넷옵션」을 선택합니다. 
  「개인정보 탭」 을 클릭합니다. 
  「기본값」에서 상위레벨을 선택하여 “모든 쿠키차단”으로 설정합니다. `,
    },
    text10: {
      en: `The company encrypts, stores and manages your personal information in accordance with legal regulations or internal policies to ensure that your personal information is not lost, stolen, leaked, tampered with or damaged. We also do our best to prevent personal information of members from being leaked or damaged due to hacking or computer viruses.
  In case of personal information damage, we frequently back up data, use the latest vaccine program, and enable secure transmission of personal information on the network through encryption communication, etc. We control unauthorized access from outside using an intrusion prevention system and strive to equip all possible technical devices to ensure security on a system basis.
  In addition, the employees handling personal information are limited to those in charge and are regularly updated by giving them a separate password. Through the implementation of the company's personal information processing policy and in-house personal information protection telegraph, we strive to check compliance of the person in charge and correct the problem immediately. However, the company shall not be held liable for any problems caused by leakage of personal information, such as IDs and passwords, due to user negligence or problems on the Internet.
  The company values your personal information, always works hard to protect it, and is transparently revealing these such protective activities through this page.
  We designate and operate the person in charge of personal information management. We will share any changes in advance.`,
      ko: `회사는 여러분의 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보 차원에서 관련 법률규정 또는 내부정책에 따라 개인정보를 암호화하여 안전하게 저장 및 관리하고 있습니다. 또한 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해서도 최선을 다하고 있습니다.
  개인정보의 훼손에 대비해서는 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 여러분의 개인정보나 자료가 누출되거나 손상되지 않도록 방지하고 있으며, 암호화통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단접근을 통제하고 있으며 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.
  이 외에도 개인정보관련 처리직원은 담당자에 한정시키고 있고 이를 위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며, 담당자에 대한 수시교육 수행과 사내 개인정보보호전담기구 등을 통하여 회사의 개인정보처리방침 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로잡을 수 있도록 노력하고 있습니다. 단, 이용자 본인의 부주의나 인터넷상의 문제로 ID, 비밀번호 등 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다.
  회사는 여러분의 개인정보를 소중하게 생각하고, 안전하게 보호하기 위해 항상 노력하며, 이러한 활동에 대해서는 이 페이지를 통해 투명하게 공개하고 있습니다.
  개인정보관리 책임자 및 담당자를 지정해 운영하고 있으며 변경 내용에 대해서는 사전에 공유해 드립니다.`,
    },
    text11: {
      en: `You can report all personal information protection related complaints that occur in the course of using the company's service to the department in charge of personal information. The company will respond quickly to your reports.
  Personal Information Protection Officer
  - Name: Ryan Byun
  - Position: CEO
  - Department: Metavity Co., Ltd
  - Contact: privacy@smileup.site / +82-2-3213-8187"
  "If you need to report or consult about other personal information violations, please contact the following organization.
  - Personal Information Violation Report Center (http://privacy.kisa.or.kr / 118 without National Number)
  - Cyber Crime Investigation Team of the Supreme Prosecutors' Office (http://www.spo.go.kr / 1301)
  - Cybersecurity Bureau of the National Police Agency (http://cyberbureau.police.go.kr / 182)
  However, this privacy policy does not apply to the collection of personal information by websites linked to the service.`,
      ko: `회사의 서비스를 이용하는 과정에서 발생하는 모든 개인정보보호 관련 민원은 개인정보 담당부서로 신고하실 수 있습니다. 회사는 여러분의 신고사항에 대해 신속하게 답변 드릴 것입니다.
      "개인정보보호 책임자
  - 이름: 변원섭
  - 직위: 대표이사
  - 소속: (주)메타비티
  - 연락처: privacy@smileup.site / 02-3213-8187
  기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
  - 개인정보침해신고센터 (http://privacy.kisa.or.kr / 국번없이 118)
  - 대검찰청 사이버범죄수사단 (http://www.spo.go.kr / 국번없이 1301)
  - 경찰청 사이버안전국 (http://cyberbureau.police.go.kr / 국번없이 182)
  다만, 서비스 내에 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 개인정보처리방침이 적용되지 않음을 알려 드립니다."
      `,
    },
    text12: {
      en: `Enforcement date: 21st JAN 2022`,
      ko: `시행일자 : 2019년 06월 01일`,
    },
  })
  const language = useRecoilValue(langState)

  //style
  //style
  //style
  const style = useGetStyle({
    center: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      color: '#191919',
    },
    textWrapper: {
      paddingTop: 16,
      paddingBottom: 24,
    },
    text: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      color: '#999999',
    },
  })
  return (
    <ScrollView>
      <View {...style.center}>
        <Text {...style.title}>{globalText.title1[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text1[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title2[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text2[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title3[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text3[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title4[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text4[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title5[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text5[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title6[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text6[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title7[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text7[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title8[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text8[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title9[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text9[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title10[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text10[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title11[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text11[language]}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default PrivacyPolicy
