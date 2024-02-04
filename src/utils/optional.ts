export class Optional<T> {
  constructor(private obj: T | null) {}
  isEmpty() {
    return this.obj == null
  }

  isPresent() {
    return this.obj != null
  }

  get() {
    return this.obj
  }
}
