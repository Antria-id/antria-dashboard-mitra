import React from "react";
import Button from "./Button";

describe("<Button /> additional tests", () => {
  const text = "Text Field";
  const bgColor = "bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]";
  const size = "sm:w-[27.125rem] w-[19rem] h-[2.938rem]";
  const txtColor = "text-white";
  const txtSize = "sm:w-[27.125rem] w-[19rem] h-[2.938rem]";
  const position =
    "sm:flex sm:justify-center sm:items-center flex justify-center items-center";

  beforeEach(() => {
    const onClick = cy.stub();
    cy.mount(
      <Button
        text={text}
        bgColor={bgColor}
        size={size}
        txtColor={txtColor}
        txtSize={txtSize}
        position={position}
        onClick={onClick}
      />
    );
    cy.wrap(onClick).as("onClick");
  });

  it("Render teks sudah diterapkan dengan benar", () => {
    cy.get("button").contains(text);
  });

  it("Menerapkan parameter untuk warna background color yang benar", () => {
    cy.get("button").should("have.class", bgColor);
  });

  it("Menerapkan warna teks yang benar", () => {
    cy.get("h1").should("have.class", txtColor);
  });

  it("Menerapkan ukuran teks yang benar", () => {
    cy.get("h1").should("have.class", txtSize);
  });

  it("Menerapkan posisi yang benar", () => {
    cy.get("h1").should("have.class", position);
  });

  it("Menerapkan kondisi klik pada button dengan benar", () => {
    cy.get("button").click();
    cy.get("@onClick").should("have.been.called");
  });
});
