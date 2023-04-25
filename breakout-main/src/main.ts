import './style.scss'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

const raioDaBola = 10
const alturaDaRaquete = 10
const larguraDaRaquete = 75
const contagemDeBlocosEmLinha = 11 // 3
const contagemDeBlocosEmColuna = 32 // 2
const larguraDoBloco = 75
const alturaDoBloco = 20
const enchimentoDoBloco = 10
const parteSuperiorDoBloco = 60
const lateralEsquerdaDoBloco = 15

canvas.width =
  (larguraDoBloco + enchimentoDoBloco) * contagemDeBlocosEmLinha +
  lateralEsquerdaDoBloco
canvas.height = 1200 //300


let raqueteX = canvas.width - larguraDaRaquete
let direitaPressionada = false
let esquerdaPressionada = false

let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2
let dy = -2

let pontos = 0
let vidas = 3

const blocos: Bloco[][] = []

for (let c = 0; c < contagemDeBlocosEmColuna; c++) {
  blocos[c] = []
  for (let l = 0; l < contagemDeBlocosEmLinha; l++) {
    blocos[c][l] = {x: 0, y: 0, estado: 1}
  }
}

document.onkeydown = (e) => {
  if (e.code === 'ArrowRight') {
    direitaPressionada = true
  } else if (e.code === 'ArrowLeft') {
    esquerdaPressionada = true
  }
}
document.onkeyup = (e) => {
  if (e.code === 'ArrowRight') {
    direitaPressionada = false
  } else if (e.code === 'ArrowLeft') {
    esquerdaPressionada = false
  }
}
document.onmousemove = (e) => {
  const relativoX = e.clientX - canvas.offsetLeft
  if (relativoX > 0 && relativoX < canvas.width) {
    raqueteX = relativoX - larguraDaRaquete / 2
  }
}

function detectaColisao() {
  for (let c = 0; c < contagemDeBlocosEmColuna; c++) {
    for (let l = 0; l < contagemDeBlocosEmLinha; l++) {
      const bloco = blocos[c][l]

      if (bloco.estado === 1) {
        if (
          x > bloco.x &&
          x < bloco.x + larguraDoBloco &&
          y > bloco.y &&
          y < bloco.y + alturaDoBloco + alturaDoBloco / 2
        ) {
          dy = -dy
          bloco.estado = 0
          pontos++

          if (pontos == contagemDeBlocosEmLinha * contagemDeBlocosEmColuna) {
            
            alert('Você ganhou, parabéns')
            reiniciaBloco()
            reiniciaBola() // retornar a posicao da bola
            reiniciaRaquete() // retornar a posicao da raquete 
            reiniciaPontos() // reinicia os pontos
            maisVelocidade() // ++ Velocidade
          }
        }
      }
    }
  }
}

// funções reinicia
function maisVelocidade() { 
  dx += 5  // + X
  dy -= 5  // - Y
}

function reiniciaPontos() { 
  pontos = 0 
}

function reiniciaRaquete() { 
  raqueteX = (canvas.width - larguraDaRaquete) / 2

}

function reiniciaBola() { 
  x = canvas.width / 2
  y = canvas.height - 30
}

function reiniciaBloco() { 
  // Criação dos blocos 
  for (let c = 0; c < contagemDeBlocosEmColuna; c++) {
   // blocos[c] = []
    for (let l = 0; l < contagemDeBlocosEmLinha; l++) {
      blocos[c][l].estado = 1 //retornando para o estado  -- 1 blocos[c][l] = {x: 0, y: 0, estado: 1}
    }
  }

}





function desenhaBola() {
  context.beginPath()
  context.arc(x, y, raioDaBola, 0, Math.PI * 2)
  context.fillStyle = 'blue'
  context.fill()
  context.closePath()
}

function desenhaRaquete() {
  context.beginPath()
  context.rect(
    raqueteX,
    canvas.height - alturaDaRaquete,
    larguraDaRaquete,
    alturaDaRaquete
  )
  context.fillStyle = 'green'
  context.fill()
  context.closePath()
}

function desenhaPontos() {
  context.font = '24px Arial'
  context.fillStyle = 'white'
  context.fillText(`Pontos: ${pontos}`, 8, 30)
}

function desenhaVidas() {
  context.font = '24px Arial'
  context.fillStyle = 'lime'
  context.fillText(`Vidas: ${vidas}`, canvas.width - 100, 30)
}

// function desenhaBlocos() {
//   for (let c = 0; c < contagemDeBlocosEmColuna; c++) {
//     for (let r = 0; r < contagemDeBlocosEmLinha; r++) {
//       if (blocos[c][r].estado == 1) {
//         const blocoX =
//           r * (larguraDoBloco + enchimentoDoBloco) + lateralEsquerdaDoBloco

//         const blocoY =
//           c * (alturaDoBloco + enchimentoDoBloco) + parteSuperiorDoBloco

//         blocos[c][r].x = blocoX
//         blocos[c][r].y = blocoY

//         context.beginPath()
//         context.rect(blocoX, blocoY, larguraDoBloco, alturaDoBloco)
//         context.fillStyle = 'deeppink'
//         context.fill()
//         context.closePath()
//       }
//     }
//   }
// }

function desenhaBlocosP() {
  const pColors = [
    // 01     02       03       04      05       06      07      08       09       10       11
    ['red', 'white', 'white', 'white', 'white', 'red', 'white', 'white', 'white', 'white', 'red'], //01
    ['red', 'white', 'white', 'white', 'red', 'red', 'red', 'white', 'white', 'white', 'red'],  //02
    ['red', 'red', 'white', 'red', 'red', 'white', 'red', 'red', 'white', 'red', 'red'], //03
    ['red', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'red'], //04
    ['red', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'red'], //05
    ['red', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'red'], //06
    ['red', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'red'],  //07
    ['red', 'red', 'red', 'red', 'white', 'white', 'white',   'red',  'red',  'red', 'red'],  //08
    ['red', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'red'], //09
    ['red', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'red'], //10
    ['red', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'red'], //11
    ['red', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'red'], //12
    ['red', 'red', 'red', 'red', 'white', 'white', 'white'  , 'red', 'red', 'red', 'red'], //13
    ['red', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'red'], //14
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //15
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //16
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //17
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //18
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //19
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //20
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //21
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //22
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //23
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //24
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //25
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //26
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //27
    ['white', 'red', 'red', 'red', 'white', 'white', 'white', 'red', 'red', 'red', 'white'], //28
    ['white', 'white', 'red', 'red', 'red', 'white', 'red', 'red', 'red', 'white', 'white'], //29
    ['white', 'white', 'white', 'red', 'red', 'red', 'red', 'red', 'white', 'white', 'white'], //30
    ['white', 'white', 'white', 'white', 'red', 'red', 'red', 'white', 'white', 'white', 'white'], //31
    ['white', 'white', 'white', 'white', 'white', 'red', 'white', 'white', 'white', 'white', 'white'], //32
 
  ];

  for (let c = 0; c < contagemDeBlocosEmColuna; c++) {
    for (let r = 0; r < contagemDeBlocosEmLinha; r++) {
      if (blocos[c][r].estado == 1) {
        const blocoX =
          r * (larguraDoBloco + enchimentoDoBloco) + lateralEsquerdaDoBloco

        const blocoY =
          c * (alturaDoBloco + enchimentoDoBloco) + parteSuperiorDoBloco

        blocos[c][r].x = blocoX
        blocos[c][r].y = blocoY

        context.beginPath()
        context.rect(blocoX, blocoY, larguraDoBloco, alturaDoBloco)
        context.fillStyle = pColors[c][r]; // define a cor com base no array de cores
        context.fill()
        context.closePath()
      }
    }
  }
}


function desenha() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  //desenhaBlocos()
  desenhaBlocosP()
  desenhaBola()
  desenhaRaquete()
  desenhaPontos()
  desenhaVidas()
  detectaColisao()

  if (x + dx > canvas.width - raioDaBola || x + dx < raioDaBola) {
    dx = -dx
  }
  if (y + dy < raioDaBola) {
    dy = -dy
  } else if (y + dy > canvas.height - alturaDaRaquete - raioDaBola) {
    if (x > raqueteX && x < raqueteX + larguraDaRaquete) {
      dy = -dy
    } else {
      vidas--
      if (!vidas) {
        alert('Fim de jogo')
        document.location.reload()
      } else {
        x = canvas.width / 2
        y = canvas.height - 30
        dx = 2
        dy = -2
        raqueteX = (canvas.width - larguraDaRaquete) / 2
      }
    }
  }

  if (direitaPressionada && raqueteX < canvas.width - larguraDaRaquete) {
    raqueteX += 7
  } else if (esquerdaPressionada && raqueteX > 0) {
    raqueteX -= 7
  }

  x += dx
  y += dy
  requestAnimationFrame(desenha)
}

document.body.appendChild(canvas)

desenha()
