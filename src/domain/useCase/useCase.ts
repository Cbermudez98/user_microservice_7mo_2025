export interface IUseCase<T, K> {
  execute: (data: T) => Promise<K>;
}
