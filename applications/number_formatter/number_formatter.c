#include <stdio.h>
#include <stdlib.h>

int main(int args, char* argv[]) {

    FILE *outputFile = fopen(argv[1], "w");
    char c = fgetc(stdin);

    while(c != EOF) {
        fprintf(outputFile, "%c", c);
        fflush(outputFile);
        c = fgetc(stdin);
    }
    
    return 0;
}