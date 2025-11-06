module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Restrict imports from external/services to only handlers/*.command.ts and handlers/*.query.ts files',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      invalidServiceImport:
        'Services from external/services can only be imported in external/handlers/*.command.ts or external/handlers/*.query.ts files',
    },
  },
  create(context) {
    return {
      isImportDeclaration(node) {
        const importPath = node.source.value
        const filename = context.getFilename()

        if(!importPath.includes('/external/services')) {
          return
        }

        const isHandlerCommand =
          /\/external\/handlers\/[^/]+\/[^/]+\.command\.ts$/.test(filename)
        const isHandlerQuery =
          /\/external\/handlers\/[^/]+\/[^/]+\.query\.ts$/.test(filename)

        if(isHandlerCommand || isHandlerQuery) {
          return
        }

        context.report({
          node,
          messageId: 'invalidServiceImport'
        })
      }
    }
  }
}