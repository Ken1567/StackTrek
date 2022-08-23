const Polymul = (listA, listB, m, n) =>
{
    prod = [];
    for (i = 0; i < m + n - 1; i++)
    {
        prod[i] = 0
    }
    for (i = 0; i < m; i++)
    {
        for (j = 0; j < n; j++)
            prod[i + j] += listA[i] * listB[j]; 
    }

    prod.reverse()


    var dict = {}
    for(i=0; i<prod.length; i++)
    {
        dict[i] = prod[i];
    }
    return dict;
}

const listA = [1,2,3];
const listB = [2,4];
m = listA.length
n = listB.length

console.log(Polymul(listA, listB, m, n)) 