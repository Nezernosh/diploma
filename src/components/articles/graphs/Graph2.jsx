import React from 'react';
import '../articles.css';
import DFS from './DFS';
import { DirectedGraph } from './DirectedGraph';
import Comments from "../../comments/Comments";
import { graphSecondComments } from '../../comments/getComments';

export function Graph2() {
    return (
        <>
            <div className='div-article'>
                <h2>Поиск в глубину</h2>
                <h3>Стратегия поиска в глубину</h3>
                <p>Как следует из её названия, состоит в том,
                    чтобы идти "в глубь" графа, насколько это возможно.
                    При выполнении поиска в глубину он исследует все ребра, выходящие из вершины, открытой последней,
                    и покидает вершину, только когда не остается неисследованных ребер -
                    при этом происходит "откат" в вершину, из которой была открыта вершина v.
                    Этот процесс продолжается до тех пор, пока не будут открыты все вершины, достижимые из исходной.</p>
                <p>Если при этом остаются неоткрытые вершины, то одна из них выбирается в качестве новой исходной вершины
                    и поиск повторяется уже из неё.
                    Этот процесс повторяется до тех пор, пока не будут открыты все вершины.</p>
                <p>Как и в процессе поиска в ширину, вершины графа окрашиваются в разные цвета,
                    свидетельствующие об их состоянии.
                    Каждая вершина изначально белая, затем при открытии в процессе
                    поиска она окрашивается в серый, и по завершении, когда её список смежности полностью просканирован,
                    она становится черной. Такая методика гарантирует, что каждая вершина в конечно счете находится только в одном дереве поиска в глубину,
                    так что деревья не пересекаются.</p>
                <p>Помимо построения леса поиска в глубину, поиск в глубину также проставляет в вершинах метки времени.
                    Каждая вершина имеет две такие метки: первую - v.d, в которой записывается,
                    когда вершина v открывается (и окрашивается в серый цвет),
                    и вторую v.f, которая фиксирует момент,
                    когда поиск завершает сканирование списка смежности вершины v и она становиться черной.
                    Эти метки используются многими алгоритмами и полезны при рассмотрении поведения поиска в глубину.</p>
                <p>Далее представлен псевдокод алгоритма поиска в глубину.
                    Входной граф G может быть как ориентированным, так и неориентированным.
                    Переменная time - глобальная и используется для меток времени.</p>
                <div className="console">
                    <div className="console-header">
                        <div className="console-button red"></div>
                        <div className="console-button yellow"></div>
                        <div className="console-button green"></div>
                    </div>
                    <pre>
                        <code>
                            {`DFS(G)
    for каждой вершины u в G.V
        u.color = white
        u.pi = NIL
    time = 0
    for каждой вершины u в G.V
        if u.color == white
            DFS-VISIT(G,u)

DFS-Visit(G,u)
    time = time + 1
    u.d = time
    u.color = gray
    for каждой v в G.Adj[u]
        if u.color == white
            u.pi = u
            DFS-Visit(G,v)
    u.color = black
    time = time + 1
    u.f = time`}
                            <span className="console-cursor"></span>
                        </code>
                    </pre>
                </div>
                <h3>Применение алгоритма поиска в глубину DFS к ориентированному графу.</h3>
                <p>Стартовой вершиной является вершина u</p>
                <DirectedGraph />
                <p>В вершинах указаны метки времени в формате "открытие/завершение"</p>
                <DFS />
                <img src='../../../images/articles/graphs/dfs.png' alt='dfs'></img>
                <h3>Классификация рёбер</h3>
                <p>Интересное свойство поиска в глубину заключается в том, что поиск может использоваться для классификации рёбер входного графа.</p>
                <p>Мы можем определить четыре типа рёбер в терминах леса Gpi, полученного при поиске в глубину в графе G.</p>
                <p>1. Рёбра деревьев - это рёбра леса Gpi. Ребро (u,v) является ребром дерева, если при исследовании этого ребра была впервые открыта вершина v.</p>
                <p>2. Обратные рёбра - это рёбра (u,v), соединяющие вершину u с её предком v в дереве поиска в глубину.
                    Петли (рёбра-циклы), которые могут встречаться в ориентированных графах, рассматриваются как обратные рёбра.</p>
                <p>3. Прямые рёбра - это рёбра (u,v), не являющиеся рёбрами дерева и соединяющие вершину u с её потомком v в дереве поиска в глубину.</p>
                <p>4. Перекрёстные рёбра - все остальные рёбра графа. Они могут соединять вершины одного и того же дерева поиска в глубину,
                    когда ни одна из вершин не является предком другой, или соединять вершины в разных деревьях поиска в глубину.</p>
                <p>Алгоритм DFS можно модифицировать так, что он будет классифицировать встречающиеся при работе рёбра.
                    Ключевая идея состоит в том, что каждое ребро (u,v) можно классифицировать с
                    помощью цвета вершины v при первом его исследовании (правда, при этом не различаются прямые и перекрёстные рёбра).</p>
                <div className="console">
                    <div className="console-header">
                        <div className="console-button red"></div>
                        <div className="console-button yellow"></div>
                        <div className="console-button green"></div>
                    </div>
                    <pre>
                        <code>
                            {`Реализация на C++
#include <iostream>
#include <list>
using namespace std;

class Graph {
  int numVertices;
  list<int> *adjLists;
  bool *visited;

   public:
  Graph(int V);
  void addEdge(int src, int dest);
  void DFS(int vertex);
};

// Initialize graph
Graph::Graph(int vertices) {
  numVertices = vertices;
  adjLists = new list<int>[vertices];
  visited = new bool[vertices];
}

// Add edges
void Graph::addEdge(int src, int dest) {
  adjLists[src].push_front(dest);
}

// DFS algorithm
void Graph::DFS(int vertex) {
  visited[vertex] = true;
  list<int> adjList = adjLists[vertex];

  cout << vertex << " ";

  list<int>::iterator i;
  for (i = adjList.begin(); i != adjList.end(); ++i)
    if (!visited[*i])
      DFS(*i);
}

int main() {
  Graph g(4);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 2);
  g.addEdge(2, 3);

  g.DFS(2);

  return 0;
}`}
                            <span className="console-cursor"></span>
                        </code>
                    </pre>
                </div>
                <p>Временная сложность алгоритма DFS представлена ​​в виде O (V + E), где V — количество узлов, а E — количество ребер.
                    Пространственная сложность алгоритма равна O(V).</p>
            </div>
            <Comments
                getCommentsApi={graphSecondComments}
                commentsUrl="http://localhost:3004/comments"
                currentUserId="2"
            />
        </>
    )
}
