<template lang="pug">
  .grid-container
    .grid-wrapper
      .type-title Form Test
    .grid-wrapper
      .type-title 기본
      .hw-form
        .header
          .title Form Test 1
        .field
          label Default
          input(type="text", placeholder="Insert data")
    .grid-wrapper
      .type-title Inline
      .hw-form
        .field.inline
          label Default
          input(type="text", placeholder="Insert data")
    .grid-wrapper
      .type-title Field
      .hw-form
        .field
          label Name
          input(type="text", placeholder="Insert data")
        .field
          label Age
          input(type="text", placeholder="Insert data")
    .grid-wrapper
      .type-title Fields
      .hw-form.inline
        .field
          label Double Input
          .fields.hw-grid.divide-2
            .field.column
              input(type="text", placeholder="first data")
            .field.column
              input(type="text", placeholder="second data")
        .divide
        .field
          label Double Input
          .fields.hw-grid.divide-2
            .field.column
              input(type="text", placeholder="first data")
            .field.column
              input(type="text", placeholder="second data")
    .grid-wrapper
      .type-title 기본
      .hw-form
        .field
          label Input 1
          .fields.divide-2
            .field.column
              input(type="text", placeholder="first data")
            .field.column
              input(type="text", placeholder="second data")
        .field
          label Input 2
          .fields.divide-3
            .field.column
              input(type="text", placeholder="first data")
            .field.column
              input(type="text", placeholder="second data")
            .field.column
              input(type="text", placeholder="second data")
        .field
          label Form Span..
          .fields
            .field.column.span-3
              input(type="text", placeholder="first data")
            .field.column.span-5
              input(type="text", placeholder="second data")
            .field.column.span-4
              input(type="text", placeholder="second data")
        .field
          label Input 3
          input(type="text", placeholder="first data")
        .field.inline
          label Input 3
          input(type="text", placeholder="first data")
          span.extra
            i.gis.gi-check
        .field.inline
          input(type="text", placeholder="first data")
          span.extra @
          input(type="text", placeholder="gabia.com")
        .field.inline
          input(type="text", placeholder="010")
          span.extra -
          input(type="text", placeholder="middle number")
          span.extra -
          input(type="text", placeholder="last number")
    .grid-wrapper
      .type-title 기본
      .hw-form
        .fields.hw-grid.left-side
          .field.column.span-2
            .label static label 11
          .field.column
            input.hw-input(type="text", placeholder="second data")
        .fields.hw-grid.left-side
          .field.column.span-2.label
            .label static label 2
          .field.column
            input.hw-input(type="text", placeholder="second data")
        .fields.hw-grid.left-side
          .field.column.span-2.label
            .label static label 3
          .field.column
            input.hw-input(type="text", placeholder="second data")
</template>
<script>

export default {
  name: 'grid-view',
  data () {
    return {
      gridLength: 12,
      columnCount: ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
    }
  }
}
</script>
