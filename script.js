"use strict";
let score = 20;
let pontuacaoMaxima = 0;
const gerarNumeroSecreto = () => Math.trunc(Math.random() * 20) + 1;
let numeroSecreto = gerarNumeroSecreto();
const pegarPalpite = () =>
	Number(document.querySelector(".container__e_palpite").value);
const exibirMensagem = (mensagem) =>
	(document.querySelector(".container__d_mensagem").textContent = mensagem);
const exibirPontuacao = (pontuacao) =>
	(document.querySelector(".container__d_pontos").textContent = pontuacao);
const exibirNumeroSecreto = (numero) =>
	(document.querySelector(".cabecalho__numero").textContent = numero);
const reduzirPlacar = function (palpite) {
	exibirMensagem(
		palpite < numeroSecreto ? "📉 Muito baixo!!!" : "📈 Muito alto!!!"
	);
	score--;
	exibirPontuacao(score);
};

document
	.querySelector(".cabecalho__jogue_novamente")
	.addEventListener("click", function () {
		numeroSecreto = gerarNumeroSecreto();
		exibirNumeroSecreto("?");
		document.querySelector(".container__e_palpite").value = "";
		exibirMensagem("Comece a adivinhar...");
		score = 20;
		exibirPontuacao(score);
		document.querySelector("body").style.backgroundColor = "#222831";
	});

document
	.querySelector(".container__e_checar")
	.addEventListener("click", function () {
		let palpite = pegarPalpite();
		if (!palpite) {
			exibirMensagem("⛔️ Digite um palpite");
		} else if (palpite < 1 || palpite > 20) {
			exibirMensagem("⛔️ O palpite deve ser entre 1 e 20!");
		} else if (numeroSecreto === palpite) {
			exibirNumeroSecreto(numeroSecreto);
			exibirMensagem("🎉 Parabéns, você acertou!");
			document.querySelector("body").style.backgroundColor = "#00ADB5";
			if (score > pontuacaoMaxima) {
				pontuacaoMaxima = score;
				document.querySelector(
					".container__d_pontuacao_maxima"
				).textContent = pontuacaoMaxima;
			}
		} else {
			if (score < 1) {
				exibirMensagem("💥 Você perdeu, tente novamente!");
			} else {
				reduzirPlacar(palpite);
			}
		}
	});
