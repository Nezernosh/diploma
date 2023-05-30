import React from 'react';
import '../articles.css';
import GraphsExample from './GraphsExample';
import Comments from "../../comments/Comments";
import { structureEightComments } from '../../comments/getComments';

export function Structure8() {
    return (
        <>
            <div className='div-article'>
                <h2>Графы</h2>
                <h3>В математической теории графов и информатике граф — это совокупность непустого множества вершин и множества пар вершин (связей между вершинами).</h3>
                <p>Граф — это более общий случай дерева. Иногда деревья называют ациклическими графами. Отличий у этих структур данных два:</p>
                <p>● В графе возможны циклы, то есть «ребёнок» может быть «родителем» для того же элемента.</p>
                <p>● Рёбра тоже могут нести смысловую нагрузку, то есть нужно сохранять их значения.</p>
                <p>Графы бывают ориентированные и неориентированные.
                    У первых рёбра между узлами имеют направление, так что порядок элементов важен.
                    У вторых направлений нет, и элементы можно читать и обходить в любом порядке.</p>
                <h3>Неориентированный граф из пяти вершин и ориентированный граф из шести вершин:</h3>
                <GraphsExample />
                <p>Имеется два стандартных способа представления графа G = (V,E): как набора списков смежных вершин и как матрицы смежности.</p>
                <p>Оба способа представления применимы как для ориентированных, так и для неориентированных графов.
                    Обычно более предпочтительным является представление с помощью списков смежности,
                    поскольку оно обеспечивает компактное представление разреженных графов,
                    т.е. таких, для которых количество ребер гораздо меньше, чем количество вершин в квадрате.
                </p>
                <p>Представление с помощью матрицы смежности предпочтительнее в случае плотных графов,
                    т.е. когда количество ребер близко к количеству вершин в квадрате.</p>
                <img src='../../../images/articles/structures/type_of_graphs.png' alt='type of graphs'></img>
                <p>Потенциальный недостаток представления с помощью списков смежности заключается в том,
                    что при этом нет более быстрого способа определить, имеется ли данное ребро (u,v) в графе, чем поиск v в списке Adj[u].
                    Этот недостаток можно устранить ценой использования асимптотически большего количества памяти в представлении графа с помощью матрицы смежности.</p>
                <div className="console">
                    <div className="console-header">
                        <div className="console-button red"></div>
                        <div className="console-button yellow"></div>
                        <div className="console-button green"></div>
                    </div>
                    <pre>
                        <code>
                            {`Реализация графа на языке C#:
//Класс описывающий ребро графа.
public class GraphEdge
{
    public GraphVertex ConnectedVertex { get; }

    public int EdgeWeight { get; }

    public GraphEdge(GraphVertex connectedVertex, int weight)
    {
        ConnectedVertex = connectedVertex;
        EdgeWeight = weight;
    }
}
//Класс описывает вершину графа, с возможностью добавления списка связанных вершин.
public class GraphVertex
{
    public string Name { get; }

    public List<GraphEdge> Edges { get; }

    public GraphVertex(string vertexName)
    {
        Name = vertexName;
        Edges = new List<GraphEdge>();
    }

    public void AddEdge(GraphEdge newEdge)
    {
        Edges.Add(newEdge);
    }

    public void AddEdge(GraphVertex vertex, int edgeWeight)
    {
        AddEdge(new GraphEdge(vertex, edgeWeight));
    }

    public override string ToString() => Name;
}
//Класс описывающий граф с методами добавления вершин и ребер.
public class Graph
{
    public List<GraphVertex> Vertices { get; }

    public Graph()
    {
        Vertices = new List<GraphVertex>();
    }

    public void AddVertex(string vertexName)
    {
        Vertices.Add(new GraphVertex(vertexName));
    }

    public GraphVertex FindVertex(string vertexName)
    {
        foreach (var v in Vertices)
        {
            if (v.Name.Equals(vertexName))
            {
                return v;
            }
        }

        return null;
    }

    public void AddEdge(string firstName, string secondName, int weight)
    {
        var v1 = FindVertex(firstName);
        var v2 = FindVertex(secondName);
        if (v2 != null && v1 != null)
        {
            v1.AddEdge(v2, weight);
            v2.AddEdge(v1, weight);
        }
    }
}`}
                            <span className="console-cursor"></span>
                        </code>
                    </pre>
                </div>
                <p>Как применяют графы:</p>
                <p>● Для хранения информации, связанной друг с другом сложными соотношениями.</p>
                <p>● Для анализа соотносящейся друг с другом информации.</p>
                <p>● Для построения маршрута из точки А в точку Б.</p>
            </div>
            <Comments
                getCommentsApi={structureEightComments}
                commentsUrl="http://localhost:3004/comments"
                currentUserId="2"
            />
        </>
    )
}