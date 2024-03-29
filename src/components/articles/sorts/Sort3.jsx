import React from 'react';
import '../articles.css';
import Qsort from './Qsort';
import Comments from "../../comments/Comments";
import { sortThirdComments } from '../../comments/getComments';

export function Sort3() {
    return (
        <>
            <div className='div-article'>
                <h2>Быстрая сортировка</h2>
                <p>Алгоритм быстрой сортировки имеет в наихудшем случае для входного массива из n элементов время работы равное O(n^2).
                    Несмотря на такую медленную работу в наихудшем случае, этот алгоритм на практике зачастую оказывается оптимальным благодаря тому,
                    что в среднем время его работы намного лучше: O(n lg n).
                    Алгоритм обладает также тем преимуществом, что сортировка в нем выполняется на месте,
                    без использования дополнительной памяти, поэтому он хорошо работает даже в средах с виртуальной памятью.</p>
                <h3>Описание быстрой сортировки</h3>
                <p>Быстрая сортировка применяет парадигму "разделяй и властвуй".
                    Ниже описан процесс сортировки подмассива A[p..r], состоящий,
                    как и все алгоритмы с использованием декомпозиции, из трех этапов.</p>
                <h4>Разделение:</h4>
                <p>Массив A[p..r] разбивается на два (возможно, пустых) подмассива A[p..q-1] и A[q+1..r],
                    таких, что каждый элемент A[p..q-1] меньше или равен A[q], который в свою очередь,
                    не превышает любой элемент подмассива A[q+1..r].
                    Индекс q вычисляется в ходе процедуры разбиения.</p>
                <h4>Властвование:</h4>
                <p>Подмассивы A[p..q-1] и A[q + 1..r] сортируются с помощью рекурсивного вызова процедуры быстрой сортировки</p>
                <h4>Комбинирование:</h4>
                <p>Поскольку подмассивы сортируются на месте, для их объединения не требуются никакие действия: весь массив A[p..r] оказывается отсортированным.</p>
                <h4>Разбиение массива</h4>
                <p>Ключевой частью рассматриваемого алгоритма сортировки является процедура Partition,
                    изменяющая порядок элементов подмассива A[p..r] без привлечения дополнительной памяти.</p>
                <div className="console">
                    <div className="console-header">
                        <div className="console-button red"></div>
                        <div className="console-button yellow"></div>
                        <div className="console-button green"></div>
                    </div>
                    <pre>
                        <code>
                            {`Partition (A,p,r)
x = A[r]
i = p - 1
for j = p to r - 1
    if A[j] <= x
        i = i + 1
        Обменять A[i] и A[j]
Обменять A[i + 1] и A[r]
return i + 1`}
                            <span className="console-cursor"></span>
                        </code>
                    </pre>
                </div>
                <p>Пример действия процедуры Partition на массив.
                    Элемент A[r] становится опорным элементом x.
                    Светло-серым обозначены элементы массива, которые не превышают x.
                    Темно-серым обозначены элементы с величной больше x.</p>
                <img src='../../../images/articles/sorts/qsort_partition.png' alt='partition in qsort'></img>
                <h3>Пример работы быстрой сортировки с задержкой в 4 секунды на каждом этапе:</h3>
                <p>На каждом этапе элементы массива выделяются разным цветом:</p>
                <p>● чёрным цветом - отсортированные и неиспользуемые на данном шаге элементы</p>
                <p style={{ color: '#1eb2a6' }}>● зелёным цветом - опорный (pivot) элемент</p>
                <p style={{ color: '#FF6347' }}>● красным цветом - не превышающие опорный</p>
                <p style={{ color: '#4169E1' }}>● синим цветом - больше опорного</p>
                <Qsort />
                <div className="console">
                    <div className="console-header">
                        <div className="console-button red"></div>
                        <div className="console-button yellow"></div>
                        <div className="console-button green"></div>
                    </div>
                    <pre>
                        <code>
                            {`Реализация на С.
void quickSortR(T* a, long N) {
// На входе - массив a[], a[N] - его последний элемент.

  long i = 0, j = N-1; 		// поставить указатели на исходные места
  T temp, p;

  p = a[ N>>1 ];		// центральный элемент

  // процедура разделения
  do {
    while ( a[i] < p ) i++;
    while ( a[j] > p ) j--;

    if (i <= j) {
      temp = a[i]; a[i] = a[j]; a[j] = temp;
      i++; j--;
    }
  } while ( i<=j );


  // рекурсивные вызовы, если есть, что сортировать 
  if ( j > 0 ) quickSortR(a, j);
  if ( N > i ) quickSortR(a+i, N-i);
}`}
                            <span className="console-cursor"></span>
                        </code>
                    </pre>
                </div>
            </div>
            <Comments
                getCommentsApi={sortThirdComments}
                commentsUrl="http://localhost:3004/comments"
                currentUserId="2"
            />
        </>
    )
}
