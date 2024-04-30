import { MethodPick } from "../views/MethodPick/MethodPick"
import { TheoryBlock } from "../views/TheoryBlock/TheoryBlock"
import { Board } from "../views/Board/Board"
import { PracticeBlock } from "../views/PracticeBlock/PracticeBlock"
import { BigData } from "../views/BigDataBlock/BigData"

export const nav = [
     { path:     "/",         name: "Главная",        element: <MethodPick />},
     { path:     "/rsa",         name: "RSA",        element: <Board selectedMethod="RSA"/>},
     { path:     "/eg",         name: "EG",        element: <Board selectedMethod="EG"/>},
     { path:     "/rsa/theory",         name: "Теория RSA",        element: <TheoryBlock method="RSA"/>},
     { path:     "/eg/theory",         name: "Теория EG",        element: <TheoryBlock method="EG"/>},
     { path:     "/rsa/practice",         name: "Практика RSA",        element: <PracticeBlock method="RSA"/>},
     { path:     "/eg/practice",         name: "Практика EG",        element: <PracticeBlock method="EG"/>},
     { path:     "/bigdata/rsa",         name: "Большие данные RSA",        element: <BigData method="RSA"/>},
     { path:     "/bigdata/eg",         name: "Большие данные EG",        element: <BigData method="EG"/>},
]