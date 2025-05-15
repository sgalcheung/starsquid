import type { Component } from "../internals/Component";

export interface Chapter extends Component {
  title: string,
  articles: Array<string>,
}
