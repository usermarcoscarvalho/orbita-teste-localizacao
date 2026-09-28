# Teste de localizacao em segundo plano (iOS)

Projeto **isolado**, sem nenhuma relacao com o sistema Orbita de producao. O
unico objetivo aqui e provar, no seu proprio iPhone, se um app nativo
(empacotado com Capacitor a partir de uma pagininha web simples) consegue
continuar mandando localizacao com o app em segundo plano / tela travada --
o que um PWA (app web comum) nao consegue fazer no iOS.

Todo o caminho abaixo e gratuito: sem Mac, sem os US$ 99/ano da Apple
Developer Program.

## O que ja esta pronto neste projeto

- Paginazinha de teste (`www/index.html` + `src/app.js`) com 3 botoes:
  Iniciar rastreio, Parar, Limpar historico. Cada ponto de localizacao
  recebido aparece numa lista com hora, latitude e longitude.
- Plugin `@capgo/background-geolocation` (gratuito, mantido, sem licenca
  paga) ja instalado e configurado.
- Projeto iOS (`ios/`) ja gerado pelo Capacitor, com as permissoes de
  localizacao (`Info.plist`) ja configuradas, inclusive o modo de segundo
  plano (`UIBackgroundModes: location`).
- Um workflow de GitHub Actions (`.github/workflows/build-ipa.yml`) que
  compila o app num Mac hospedado gratuitamente pelo GitHub e gera um
  arquivo `.ipa` **sem assinatura** -- o SideStore/AltStore assina esse
  arquivo depois, direto no seu iPhone, usando so o seu Apple ID gratuito.

## Passo 1 -- Criar um repositorio no GitHub

Se voce ainda nao tem conta no GitHub, crie uma gratis em
https://github.com/signup (leva 2 minutos).

Depois, crie um repositorio novo em https://github.com/new:
- Nome: por exemplo `orbita-teste-localizacao`
- Visibilidade: **Publico** (importante -- e o que da minutos ilimitados e
  gratuitos de build no GitHub Actions, mesmo rodando num Mac)
- NAO marque a opcao de adicionar README, .gitignore ou licenca (esse
  projeto ja vem com os arquivos prontos)

## Passo 2 -- Subir este projeto pro repositorio

Abra o terminal (PowerShell) dentro desta pasta e rode, substituindo pela
URL que o GitHub te deu na tela de criacao do repositorio:

```powershell
git init
git add -A
git commit -m "Projeto de teste de localizacao em segundo plano"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/orbita-teste-localizacao.git
git push -u origin main
```

## Passo 3 -- Acompanhar o build e baixar o .ipa

Assim que o push terminar, va na aba **Actions** do repositorio no GitHub.
Um build chamado "Build iOS de teste (sem assinatura)" comeca sozinho e
leva uns 5 a 10 minutos. Quando terminar (bolinha verde), clique nele e
baixe o arquivo em "Artifacts" -> `orbita-teste-localizacao-ipa` (vem
zipado, dentro tem o `orbita-teste-localizacao.ipa`).

## Passo 4 -- Instalar o SideStore ou o AltStore Classic no iPhone

Sao ferramentas gratuitas que instalam o `.ipa` no seu iPhone usando so o
seu Apple ID normal (sem pagar nada, sem precisar de Mac). Siga o guia
oficial de uma delas:

- SideStore: https://sidestore.io (documentacao de instalacao no site)
- AltStore Classic (mais nova, nao precisa nem de computador na
  configuracao inicial): https://altstore.io

Essas ferramentas mudam de vez em quando a forma exata de instalar, entao
siga o passo a passo oficial do site na hora -- e mais confiavel do que eu
descrever aqui um procedimento que pode estar desatualizado.

## Passo 5 -- Instalar e testar

1. Transfira o `.ipa` baixado pro iPhone (AirDrop, iCloud Drive, e-mail
   pra voce mesmo, o que for mais facil) e abra ele com o SideStore/AltStore
   pra instalar.
2. Abra o app "Orbita Teste Localizacao" no iPhone.
3. Quando pedir permissao de localizacao, permita. Se nao aparecer a opcao
   "Sempre" (Always) de primeira, va em Ajustes -> Privacidade -> Servicos
   de Localizacao -> Orbita Teste Localizacao -> Sempre.
4. Toque em "Iniciar rastreio".
5. Trave a tela do iPhone e guarde ele no bolso. Ande um pouco de vez em
   quando (o teste usa um filtro de 10 metros de distancia -- parado
   demais, nao gera pontos novos).
6. Depois de uns 10-15 minutos, destrave o iPhone e abra o app de novo.
   Se a lista de pontos cresceu com horarios durante o tempo que ficou
   travado, e a prova de que funciona -- o problema do app atual (PWA) e
   mesmo so a arquitetura web, e um app nativo resolve.

## E depois?

Esse projeto e soh a prova de conceito. Colocar isso de verdade no app dos
motoristas (empacotando o Orbita real com Capacitor) e um passo seguinte,
separado e maior -- me chama quando quiser seguir com isso.
