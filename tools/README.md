# idl-gokit

通过  `.proto` 文件，生成对应的 `.d.ts` 等相关文件


1. 在`idl-tskit.exe`同级目录放置`idl.yaml`配置文件，示例如下：
```yaml
project:
    app.idl:
        - base/base.proto
        - base/code.proto
        - bgo/base/ap.proto
        - mpff/storage/oss.v1.proto
        - mpff/user/passport.v1.proto
        - tss/game/config.proto
        - tss/game/table.v2.proto
        - tss/match_v2/matematch.v1.proto
        - tss/match_v2/prematch.v1.proto
        - tss/match_v2/regularmatch.proto
output_path: ./test_out/idl
import_path: F:/gitroot/idl
```

`output_path` 和 `import_path` 可使用相对路径，相对于 `idl-tskit.exe`

2. 直接在当前目录下运行 `idl-tskit.exe` 即可
