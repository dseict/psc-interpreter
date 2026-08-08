export type PSCValueRef<T> = {
  get: () => T;
  set: (value: T) => void;
};

export abstract class PSCValue<T = any> {
  abstract get(): T;
  abstract set(value: T): void;
  abstract type(): string;
  abstract toString(): string;
}

export class PSCNumber extends PSCValue<number> {
  value: number;
  constructor(value: number) {
    super();
    this.value = value;
  }
  get() {
    return this.value;
  }
  set(value: number) {
    this.value = value;
  }
  type() {
    return "number";
  }
  toString() {
    return this.value.toString();
  }
}

export class PSCString extends PSCValue<string> {
  value: string;
  constructor(value: string) {
    super();
    this.value = value;
  }
  get() {
    return this.value;
  }
  set(value: string) {
    this.value = value;
  }
  type() {
    return "string";
  }
  toString() {
    return this.value;
  }
}

export class PSCBoolean extends PSCValue<boolean> {
  value: boolean;
  constructor(value: boolean) {
    super();
    this.value = value;
  }
  get() {
    return this.value;
  }
  set(value: boolean) {
    this.value = value;
  }
  type() {
    return "boolean";
  }
  toString() {
    return this.value ? "true" : "false";
  }
}

export class PSCArray extends PSCValue<PSCValue[]> {
  value: PSCValue[];
  constructor(value: PSCValue[]) {
    super();
    this.value = value;
  }
  get() {
    return structuredClone(this.value);
  }
  set(value: PSCValue[]) {
    this.value = structuredClone(value);
  }
  getIndex(i: number) {
    return structuredClone(this.value[i]);
  }
  setIndex(i: number, value: any) {
    this.value[i] = structuredClone(value);
  }
  type() {
    return "array";
  }
  toString() {
    return "[" + this.value.map((v) => v.toString()).join(",") + "]";
  }
}
