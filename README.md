grunt-coveralls-merge
=====================

[![Codeship Status](https://www.codeship.io/projects/5d27ce50-55eb-0131-8b70-5abb769c8f3b/status)](https://www.codeship.io/projects/11595)

# Getting started

To publish to coveralls.io multiple reports:

```js
coveralls_merge: {
  options: {
    dryRun: false,
    coveralls_files: [
      'coverallsFile1.json',
      'coverallsFile2.json'
    ],
    coverage_dir: 'coverage'
  }
}
```

# Complete configuration

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `coveralls_file` | `Array` | List of coveralls file in json format. |
| `dryRun` | `boolean` | **true**: will save a coveralls-merged.json file in coverage_dir<br>**false**: will send data to coveralls |
| `coverage_dir` | `String` | Folder used to save coveralls-merged.json |
