#  OpenLab_Project - 제윤 메디컬 x 경북대학교 IoT 표준화 연구실


프로젝트 이전 - MQTT_based_NAT_relay_program (완료, 설명 추가 안함)

-----------------------------------------------------------
- Docker를 활용하여 공유기 아래에 Mosquitto MQTT 브로커 서버를 두어 Typescript 기반 스마트 약상자 MQTT 통신 구현을 목표로 합니다.
- 먼저 생소할 수 있는 Typescript 사용법과 환경설정을 설명하고, 이를 기반으로 현재까지는(200728) 공인 IP Host와 사설 IP Host간의 통신 구현의 단계들로 구성합니다.
  



**< Environment >**

**•OS : Ubuntu IoT (64-bit) 20.04 LTS version**

**•Nodejs : 12.18.3 version**

**•tsc : 3.9.7 version**

**•ts-node : 8.10.2 version**

**•npm : 6.14.6 version**

**•mosquitto : 1.6.10 version**



## <1> 개발 환경 구축



### 1. Scoop 프로그램 설치



Typescript는 Javascript와 유사하며, type을 지정해주는게 큰 특징입니다. 본 문서에서는 Typescript로 MQTT 기반 통신을 구현합니다. 

Typescrit의개발 환경은 Nodejs 개발 환경과 같습니다. 즉, Nodejs를 설치하고 Visual Studio Code를 설치하면 바로 개발할 수 있습니다. 이 프로그램들은 각 웹 사이트에 접속해서 내려받아 설치해야 합니다. 하지만 이렇게 설치하면 프로그램을 판올림 할때 같은 과정을 반복해야 합니다. 따라서 scoop이라는 설치 프로그램을 사용하겠습니다.



##### 가. Window PowerShell 을 관리자 권한으로 실행합니다.

##### 나. Scoop 을 설치합니다.

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
$env:SCOOP = 'C:/Scoop'
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
scoop install aria2
```

첫번째 명령어는 세번째 명령이 정상적으로 동작하도록 윈도우 실행 규칙을 변경합니다. 이때 실행 정책 병경을 묻는 질문에 A를 입력합니다.

두번째 명령어는 앞으로 scoop을 이용해 설치하는 모든 프로그램의 경로를 'C://Scoop'으로 설정합니다.

세번째 명령어는 scoop을 설치합니다.

네번째 명령어는 scoop을 이용해 aria2를 설치합니다. aria2를 설치해 놓으면  scoop이 다중 내려받기를 할 수 있어서 프로그램 설치 시간이 절감됩니다.



***



### 2. VSCode 설치

```powershell
scoop bucket add extras
scoop install vscode
```

첫번째 명령어는 두번째 명령에 필요한  scoop 부가 정보를 설치합니다.

두번째 명령어는  VSCode 를 설치합니다.

```
Add Visual Studio Code as a context menu option by running: "C:\Scoop\apps\vscode\current\vscode-install-context.reg"
```

앞서 말한 명령들을 실행하면 맨 마지막에 위와 같은 메시지가 출력됩니다. 이 메시지는 해당 경로의 reg파일을 실행하라는 의미입니다. 이 파일을 실행하면 마우스 오른쪽 단축 메뉴에 VSCode 실행 메뉴가 나타납니다. VSCode의 디렉터리 생성 및 사용의 사용법은 생략하겠습니다.

###### VSCode에서 터미널 열기

VSCode는 Window PowerShell같은 터미널 기능도 지원합니다. VSCode에서 터미널 창을 보이게 하려면 [보기->터미널] 메뉴를 선택하거나 Ctrl+`를 누릅니다.

터미널을 여러개 실행하려면 터미널 창 오른쪽에 + 모양의 아이콘을 클릭하거나 Ctrl+Shift+`를 투릅니다.



***



### 3. Nodejs 설치

앞서 VSCode에서 터미널을 사용할 수 있다고 했지만, scoop과 같은 설치 프로그램은 <u>반드시 관리자 모드로 VSCode를 동작</u>해야 합니다.

```powershell
scoop install nodejs-lts
node -v
```

첫번째 명령어는 scoop을 이용해 Nodejs의 안정 버전(Long Term Support, LTS)을 설치합니다.

두번째 명령어는 설치된 Nodejs의 버전을 확인합니다.



***



### 4. Typescript 컴파일러 설치

VSCode를 실행하고 터미널을 열어 typescript 패키지를 설치합니다.

```powershell
npm i -g typescript
tsc -v
```

첫번째 명령어는 typescript 패키지를 설치합니다. 앞에서 설치한 프로그램들과 달리 typescript는 Nodejs 환경에서만 동작합니다. 따라서 scoop이 아닌 Nodejs의 패키지 관리자인 npm을 사용해서 설치합니다. 참고로 i는 install, -g는 global, 즉 전역 공간에 설치하라는 의미입니다.

두번째 명령어는 설치된 컴파일러의 버전을 확인합니다.



typescript패키지는 서버와 클라이언트로 동작하는 두개의 프로그램을 포함하고 있습니다. 따라서 typescript 컴파일러 이름은 패키지 이름과 다르게 'tsv' 입니다. 즉, typescript compiler와 client라는 의미가 동시에 있습니다.



***



### 5. Typescript 컴파일과 실행의 간단한 예제

VSCode를 실행하여 디렉토리를 만들고 그 안에 `hello.ts` 파일을 생성합니다. 해당 `hello.ts`파일에 

```typescript
console.log('Hello World!')
```

위 코드를 입력하고 저장을 합니다. 이후 터미널을 열어,

```powershell
tsc hello.ts
```

위 명령어를 실행하면 typescript source가 TSC에 의해 변환되어 javascript source인 `hello.js` 파일이 생기는 것을 확인할 수 있습니다. 이후 

```powershell
node hello.js
```

이걸 Nodejs로 `hello.js` 파일을 실행하면,

```
Hello World!
```

이렇게 잘 실행되는 것을 볼 수 있습니다.



***



### 6. ts-node 설치

tsc는 typescript 코드를 ES5 형식의 javascript코드로 변환만 할 뿐 실행하지는 않습니다. 변환과 실행을 동시에 하려면 ts-node를 설치해야 합니다.

```powershell
npm i -g ts-node
```

ts-node를 설치한 뒤 -v옵션으로 버전을 확인합니다.

```powershell
ts-node hello.ts
```

이렇게 VSCode 터미널에서 컴파일과 실행을 동시에 할 수 있습니다.



***



## <2> 프로젝트 생성

### 1. package.json 파일 생성하기

 Typescript 개발은 Nodejs 프로젝트를 만든 다음, 개발 언어를 typescript로 설정하는 방식으로 진행합니다. Nodejs 프로젝트는 디렉터리를 하나 만들고 여기에 `package.json`이란 파일을 만드는 것으로 시작합니다. 




```powershell
npm init --y
```



이렇게 `package.json`파일을 해당 디렉터리 아래 생성하여 필요한 패키지를 관리 할 수 있습니다. 이렇게 파일을 만들었으면 다양한 오픈소스 패키지를 


```powershell
npm install <패키지 이름>
npm i <패키지 이름>
```

위의 명령어로 `package.json` 파일에 자동으로 기록되도록 할 수 있습니다.



다음은 `npm i` 옵션필드입니다.

| npm i 옵션 |                             의미                             | 단축 명령 |
| :--------: | :----------------------------------------------------------: | :-------: |
|   --save   | 프로젝트를 실행할 때 필요한 패키지로 설치합니다.<br />패키지 정보가 package.json 파일의 'dependencies' 항목에 등록됩니다. |    -S     |
| --save-dev | 프로젝트를 개발할 때만 필요한 패키지로 설치합니다.<br />패키지 정보가 package.json 파일의 'devDependencies' 항목에 등록됩니다. |    -D     |



Typescript 프로젝트는 보통 typescript와 ts-node 패키지를 설치합니다. 전에 두 패키지를 -g 옵션을 주어 전역에 설치했지만, 이 프로젝트를 전달 받아서 이용하는 다른 개발자의 컴퓨터에는 두 패키지가 전역에 설치되어 있지 않을 수도 있기 때문에 이를 고려해 -D옵션으로 아래의 명령어로 설치해 `package.json`에 등록을 합니다.

```powershell
npm i -D typescript ts-node
```

Typescript는 기본적으로 ESNext javascript 문법을 포함하고 있지만, 타입이 명시적으로 설정되어 있어야만 코드가 동작되기 때문에 javascript로 개발된 `chance`, `ramda`와 같은 라이브러리들은 추가로 `@types/chance` , `@types/ramda` 와 같은 type 라이브러리들을 제공해야 합니다. `@types/`가 앞에 붙는 type 라이브러리들은 항상 `index.d.ts`라는 이름의 파일을 가지고 있으며, typescript 컴파일러는 이 파일의 내용을 바탕으로 `chance`, `ramda`와 같은 라이브러리가 제공하는 함수들을 올바르게 사용했는지 검증합니다. 



또한, Typescript는 웹 브라우저나 Nodejs가 기본으로 제공하는 타입들의 존재도 그냥은 알지 못합니다. 예를 들어, `Promise`와 같은 타입을 사용하려면 `@types/node`라는 패키지를 설치해야 합니다.

```powershell
npm i -D @types/node
```

이제 `package.json` 파일 내용을 확인하면 설치한 패키지가 등록된 것을 볼 수 있습니다.


![image-20200728165950604](README%20assets/image-20200728165950604.png)



또한, typescript 프로젝트를 개발할 때는 ts-node를 사용하지만, 막상 개발이 완료되면 typescript 코드를 ES5 javascript 코드로 변화해 node로 실행해야 합니다. 이를 위해 `package.json` 파일을 열고 scripts 항목에 아래와 같이 `dev`와`build`명령을 추가합니다. 

```
 "scripts": {
  "dev" : "ts-node src",
  "build" : "tsc && node dist"  
  },
```

`dev`명령은 개발 중에 src 디렉터리에 있는 index.ts 파일을 실행하는 용도로 사용되며,
`build`명령은 개발이 완료된 후 프로그램을 배포하기 위해 dist 디렉터리에 ES5 javascript 파일을 만들 때 사용합니다.



### 2. tsconfig.json 파일 생성하기

 Typescript 프로젝트는 typescript 컴파일러의 설정 파일인 tsconfig.json 파일이 있어야 합니다. 

```
tsc --init
```

기본 tsconfig.json 파일을 열어보면 많은 옵션이 비활성화 되어있습니다. 아래의 필요한 옵션들로 구성해줍니다.

```typescript
{
  "compilerOptions": {
    "target": "es5",                         
    "module": "commonjs",                 
    "outDir": "dist",                      
    "noImplicitAny": true,                
    "baseUrl": ".",                      
    "paths": {"*":["node_modules/*"]},  
    "moduleResolution": "node",                      
    "esModuleInterop": true,
    "sourceMap" : true,
    "downlevelIteration": true,                  
  },
  "include": ["src/**/*"]
}

```



## <3> 환경 설정

이제 본격적으로 구현된 MQTT 통신을 구현해봅니다.



**먼저, 공인 IP를 사용하며 MQTT 브로커 서버인 Mosquitto을 실행하면서 ControlTower|Hospital|Doctor역할을 할 Client[1]의 Ubuntu IoT의 환경을 구축해줍니다.**





우선 최신 버전으로 패키지를 `update`, `upgrade`를 차례대로 해줍니다.

```bash
sudo apt-get update
sudo apt-get upgrade
```



curl 등 Docker에 필요한 패키지를 다운받습니다.

```bash
sudo apt-get install     apt-transport-https     ca-certificates     curl     gnupg-agent     software-properties-common 
```



PPA를 추가해줍니다.

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```



Nodejs를 설치해줍니다.

```bash
sudo apt-get install -y nodejs
```



PPA를 통해서 NodeJS를 설치하면 NodeJS 뿐만 아니라 npm도 같이 설치됩니다. 하지만 npm install시 에러가 나는 것을 방지하여 build-essential을 설치해줍니다.

```bash
sudo apt-get install build-essential
```



Doker를 사용하기 위한 다운로드와 설정을 해줍니다.

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository    "deb [arch=arm64] https://download.docker.com/linux/ubuntu \    $(lsb_release -cs) \ stable"  
sudo apt-get install docker-ce docker-ce-cli containerd.io
```



최종적으로 다시 한번 `update`와 `upgrade`를 해줍니다.

```bash
sudo apt-get update
sudo apt upgrade
```



Doker를 실행시켜 줍니다.

```bash
sudo docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto  
```



실행중인 Doker를 확인할 수 있습니다.

```bash
sudo docker container ls -a 
```



실행중인 Doker를 중지시킬 수도 있습니다.

```bash
sudo docker container stop <Container ID>
```



Doker를 다시 실행하며 Doker의 이름을 별도로 지정할 수도 있습니다.

```bash
sudo docker run -it -p 1883:1883 -p 9001:9001 --name JeyunBroker eclipse-mosquitto
```



별도로 지정한 이름으로 시작 및 중지시킬 수도 있습니다.

```bash
sudo docker container start JeyunBroker
sudo docker container stop JeyunBroker
```



Doker로 MQTT 브로커 서버인 Mosquitto를 실행시켜둔 뒤에, 다음은 공유기단의 LAN -  DHCP 서버 설정페이지로 들어가 DHCP리스트에서 수동으로 IP를 임의로 할당해주고 기억해둡니다.  (제조사마다 다름)



git clone으로 소스코드를 가져옵니다. 

```bash
sudo git clone  https://github.com/KimKeunSoo/SmartPillBox
```



`SmartPillBox`에 들어가서 필요한 module들을 가져옵니다. 정상적으로 완료되면 `node_modules`폴더가 생김을 알 수 있습니다.

```bash
sudo npm install
```





**다음으로 사설 IP를 사용하며 SmartPillBox 역할을 할 Client[2]의 Ubuntu IoT OS의 환경구축을 해줍니다.**



우선 전과 같의 단계와 같이 순서대로 입력해줍니다.

```bash
sudo apt-get update
sudo apt-get upgrade
```

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

```bash
sudo apt-get install -y nodejs
```

```bash
sudo apt-get install build-essential
```

```bash
sudo git clone  https://github.com/KimKeunSoo/SmartPillBox
```

```bash
sudo npm install
```



`SmartPillBox\assets\config.json` 파일의 IP부분을 전과 똑같이 해당 MQTT 브로커서버의 공인 IP, 즉 Client[1]의 IP주소로 수정해줍니다.



**환경 설정을 완료한 Client[2]에서 Subscribe를 해줍니다.**

 `dist/sub`파일을 node로 실행시켜 줍니다. 

```bash
node .\dist\sub.js
```

![image-20200729164012799](README%20assets/image-20200729164012799.png)

완료되었다는 문자가 나오면 잘 실행된 상태입니다.



**환경 설정을 완료한 Client[1]에서 Publish를 해줍니다.**

```bash
node .\dist\pub.js
```

![image-20200729164423495](README%20assets/image-20200729164423495.png)

연결완료와 메시지 전송이 완료되었다는 문자가 나오면 잘 실행된 상태입니다.





**Client[2]에서 Client[1]에게 받은 메시지를 출력함을 잘 확인할 수 있습니다.**

![image-20200729164138853](README%20assets/image-20200729164138853.png)

