export function DragonBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Luz ambiental sutil (Aura de titanio y cobalto) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-blue-600/[0.035] rounded-full blur-[150px]" />
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-indigo-500/[0.02] rounded-full blur-[130px]" />

      {/* Máscara de viñeta para proteger al 100% el contraste del texto */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/60 to-zinc-950" />

      {/* Dragón Tribal Artístico de Alta Gama */}
      <div className="absolute top-0 sm:top-6 left-1/2 -translate-x-1/2 w-[1000px] sm:w-[1250px] h-[1000px] sm:h-[1250px] opacity-[0.11] transition-opacity duration-1000">
        <svg
          viewBox="0 0 1200 1200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Gradiente Metálico Titanio-Cobalto para los bloques tribales */}
            <linearGradient id="tribalMetal" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#64748b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.15" />
            </linearGradient>

            {/* Gradiente para los acentos de luz y flamas secundarias */}
            <linearGradient id="tribalFlame" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.85" />
            </linearGradient>

            {/* Máscara radial de difuminado elíptico para disolver bordes */}
            <radialGradient id="tribalFade" cx="50%" cy="48%" r="48%">
              <stop offset="35%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            <mask id="tribalMask">
              <rect width="1200" height="1200" fill="url(#tribalFade)" />
            </mask>
          </defs>

          <g mask="url(#tribalMask)">

            {/* ========================================================= */}
            {/* 1. CABEZA, CRESTA Y CORNAMENTA TRIBAL FLAMEANTE */}
            {/* ========================================================= */}

            {/* Cuerno Mayor Curvo (Swoop Principal) */}
            <path
              d="M560 210 C590 150 670 90 790 70 C720 120 680 180 640 230 C615 215 585 210 560 210 Z"
              fill="url(#tribalMetal)"
            />
            {/* Cuerno Secundario (Bifurcación Tribal) */}
            <path
              d="M620 195 C665 145 745 105 845 95 C785 145 740 195 700 235 C670 215 640 205 620 195 Z"
              fill="url(#tribalFlame)"
            />
            {/* Púa Occipital Menor */}
            <path
              d="M660 240 C715 200 800 175 880 170 C810 215 755 250 710 275 C690 260 675 250 660 240 Z"
              fill="url(#tribalMetal)"
            />
            {/* Cresta Craneal Posterior */}
            <path
              d="M580 245 C640 260 720 280 770 325 C705 320 655 300 605 275 Z"
              fill="url(#tribalFlame)"
            />

            {/* Mandíbula Superior y Hocico del Dragón */}
            <path
              d="M530 230 C480 215 420 220 370 250 C340 270 315 310 340 335 C360 350 395 340 425 320 C400 340 385 375 410 395 C435 410 470 390 495 355 C515 330 535 295 540 265 C540 250 535 240 530 230 Z"
              fill="url(#tribalMetal)"
            />
            {/* Dientes y Colmillos en corte negativo */}
            <path d="M355 315 L365 338 L378 322" fill="#09090b" />
            <path d="M388 330 L398 355 L412 338" fill="#09090b" />
            <path d="M422 350 L435 378 L448 358" fill="#09090b" />

            {/* Ojo Tribal en Vértice */}
            <path
              d="M440 265 C465 250 490 260 505 278 C480 290 455 285 440 265 Z"
              fill="url(#tribalFlame)"
            />
            <circle cx="475" cy="272" r="3.5" fill="#60a5fa" />

            {/* Mandíbula Inferior Tribal */}
            <path
              d="M360 365 C330 380 300 410 305 445 C310 470 345 475 375 455 C400 440 420 415 435 390 C405 390 380 380 360 365 Z"
              fill="url(#tribalMetal)"
            />
            {/* Barba / Bigote Flamígero Tribal */}
            <path
              d="M320 440 C280 460 240 470 190 455 C230 485 285 495 335 475 C315 495 280 520 230 530 C280 535 340 515 370 480 Z"
              fill="url(#tribalFlame)"
            />

            {/* ========================================================= */}
            {/* 2. CUELLO Y LLAMAS DORSALES SUPERIORES */}
            {/* ========================================================= */}

            {/* Placa Cervical 1 */}
            <path
              d="M570 280 C610 310 675 355 720 415 C665 405 620 380 575 340 C565 315 565 295 570 280 Z"
              fill="url(#tribalMetal)"
            />
            {/* Espina Tribal Dorsal 1 */}
            <path
              d="M720 380 C780 375 860 395 910 440 C840 440 780 425 730 405 Z"
              fill="url(#tribalFlame)"
            />

            {/* Placa Cervical 2 */}
            <path
              d="M590 355 C640 395 710 450 745 525 C695 505 645 470 600 420 C585 395 585 375 590 355 Z"
              fill="url(#tribalMetal)"
            />
            {/* Espina Tribal Dorsal 2 */}
            <path
              d="M745 490 C815 490 895 525 940 580 C870 570 805 545 755 515 Z"
              fill="url(#tribalFlame)"
            />

            {/* ========================================================= */}
            {/* 3. PECHO, GARRA PRINCIPAL Y ALA TRIBAL */}
            {/* ========================================================= */}

            {/* Ala / Hombro Tribal Expansivo */}
            <path
              d="M625 435 C685 465 775 490 860 480 C800 525 715 540 640 530 C620 495 615 460 625 435 Z"
              fill="url(#tribalMetal)"
            />
            {/* Cuchillas del Ala (Wing Scythes) */}
            <path
              d="M860 480 C930 450 1020 455 1090 490 C1010 520 930 525 865 515 Z"
              fill="url(#tribalFlame)"
            />
            <path
              d="M830 525 C910 515 990 535 1060 585 C980 580 910 565 845 545 Z"
              fill="url(#tribalFlame)"
            />
            <path
              d="M790 550 C860 565 940 600 995 660 C930 640 860 615 805 580 Z"
              fill="url(#tribalFlame)"
            />

            {/* Placas Pectorales con Hendiduras Tribales */}
            <path
              d="M545 410 C510 450 470 510 475 580 C515 550 555 505 585 450 C570 435 555 420 545 410 Z"
              fill="url(#tribalMetal)"
            />
            <path
              d="M475 480 C430 520 395 585 410 655 C445 615 485 570 510 520 Z"
              fill="url(#tribalFlame)"
            />

            {/* Garra Delantera Prensil Tribal */}
            <path
              d="M410 655 C370 690 320 730 265 745 C285 715 320 695 355 680 C310 690 260 690 220 660 C265 650 315 655 365 665 Z"
              fill="url(#tribalMetal)"
            />
            <path
              d="M335 725 C295 765 245 800 185 810 C210 780 250 760 290 745 C240 760 190 755 155 725 C200 720 255 725 305 735 Z"
              fill="url(#tribalFlame)"
            />

            {/* ========================================================= */}
            {/* 4. ESPINAL MEDIO Y CURVATURA CENTRAL (S-LOOP) */}
            {/* ========================================================= */}

            {/* Vórtice Central 1 */}
            <path
              d="M580 540 C610 600 635 680 605 765 C565 715 550 640 555 580 C565 565 570 550 580 540 Z"
              fill="url(#tribalMetal)"
            />
            {/* Vórtice Central 2 (Inversión Tribal) */}
            <path
              d="M605 765 C575 840 505 915 415 940 C465 880 490 800 480 725 C520 745 565 760 605 765 Z"
              fill="url(#tribalFlame)"
            />

            {/* Espinas Flotantes de la Curva Abdominal */}
            <path
              d="M635 680 C700 710 770 765 805 840 C735 815 680 770 630 715 Z"
              fill="url(#tribalMetal)"
            />
            <path
              d="M605 765 C660 815 720 885 735 970 C680 925 635 865 600 805 Z"
              fill="url(#tribalFlame)"
            />

            {/* ========================================================= */}
            {/* 5. COLA ESPIRALADA Y LLAMAS TERMINALES */}
            {/* ========================================================= */}

            {/* Lazo Caudal Principal */}
            <path
              d="M415 940 C355 955 295 930 270 870 C250 820 275 760 330 735 C300 765 290 810 310 850 C335 890 380 905 425 895 Z"
              fill="url(#tribalMetal)"
            />
            
            {/* Espiral Caudal Inferior */}
            <path
              d="M425 895 C485 885 540 915 570 970 C600 1025 580 1095 515 1130 C450 1165 370 1145 335 1080 C365 1115 425 1125 475 1100 C525 1075 540 1025 515 980 C495 945 455 925 415 935 Z"
              fill="url(#tribalFlame)"
            />

            {/* Punta de Lanza / Púa Flamígera de la Cola */}
            <path
              d="M515 1130 C565 1160 630 1185 710 1195 C645 1170 600 1140 560 1095 Z"
              fill="url(#tribalMetal)"
            />
            <path
              d="M560 1095 C625 1115 700 1125 780 1115 C705 1095 650 1070 600 1035 Z"
              fill="url(#tribalFlame)"
            />
            <path
              d="M600 1035 C660 1045 735 1045 810 1020 C735 1010 680 985 635 950 Z"
              fill="url(#tribalMetal)"
            />

            {/* ========================================================= */}
            {/* 6. TRAZOS ORGÁNICOS CALIGRÁFICOS SECUNDARIOS */}
            {/* ========================================================= */}
            <g stroke="url(#tribalFlame)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65">
              {/* Halos de flujo de energía */}
              <path d="M490 190 C560 130 660 80 810 60" />
              <path d="M530 260 C610 210 710 170 850 160" />
              <path d="M660 360 C740 370 840 400 930 460" />
              <path d="M680 470 C770 490 870 540 960 620" />
              <path d="M640 610 C720 660 800 740 840 840" />
              <path d="M590 770 C660 850 720 940 750 1050" />
              <path d="M450 900 C520 940 570 1010 580 1100" />
            </g>

          </g>
        </svg>
      </div>
    </div>
  );
}
